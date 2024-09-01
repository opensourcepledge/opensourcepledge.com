import { getCollection } from 'astro:content';
import type { Member, MemberWithId, MemberReport } from "./content/config.ts";
import exampleMember from '../contrib/example-schema.json';

const isDev = import.meta.env.DEV;

/**
 * Generates some member data for testing to be used in dev mode.
 */
function getMockMembers(): MemberWithId[] {
  const mockDevCounts = [
    1, 34, 79, 230, 1004, 4052, 10245, 11245, 17353, 21324, 50124,
  ]
  const mockDevNames = [
    "Blorp", "Quip", "Flange", "Smidge", "Gwarp", "Twiner", "Yapper",
    "Snark", "Smorge", "Llanger", "Frrr", "Zq", "Blobber", "Cork",
  ]
  return mockDevCounts.map((mockDevCount, idx): MemberWithId => {
    let newMember = structuredClone(exampleMember) as Member;
    newMember.name = mockDevNames[idx];
    newMember.urlSquareLogoWithBackground = `/images/example-members/example-member-${idx}.svg`;
    for (let idx in newMember.annualReports) {
      newMember.annualReports[idx].averageNumberOfDevs = mockDevCount;
    }
    return {
      id: `example-member-${idx}`,
      data: newMember,
    };
  });
}

export async function getMembers(): Promise<MemberWithId[]> {
  if (isDev) {
    return Promise.resolve(getMockMembers());
  } else {
    return getCollection('members');
  }
}

export function getReportFullTotal(report: MemberReport) {
  return report.payments + report.monetaryValueOfTime + report.monetaryValueOfMaterials;
}

export function getDollarsPerDev(report: MemberReport) {
  return report.payments / report.averageNumberOfDevs;
}

export function fmtCurrency(num: number) {
  return '$' + num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * The groups members will be sorted into when `groupMembers()` is used.
 * This is a list of the maximum and minimum developer count for each group,
 * inclusive. So, `[[1, 100], [101, 500]]` means that a company with 100
 * developers will be placed in the first group, but a company with 101
 * developers will be placed in the second one, and so on.
 */
export const DEV_GROUP_BOUNDS: [number, number][] = [
  [Infinity, 25000],
  [24999, 10000],
  [9999, 1000],
  [999, 100],
  [99, 1],
];

export function formatDevGroupBounds([max, min]: [number, number]) {
  if (max == Infinity) {
    return `${min} developers or more`;
  } else {
    return `${min} to ${max} developers`;
  }
}

export function filterInactiveMembers(members: MemberWithId[]): MemberWithId[] {
  return members.filter((m) => m.data.annualReports.length > 0);
}

/**
 * Puts members into groups based on the dollars per dev donated in their latest
 * annual report, where the groups are set out by `DEV_GROUP_BOUNDS`.
 */
export function groupMembers(members: MemberWithId[]): MemberWithId[][] {
  let groups: MemberWithId[][] = DEV_GROUP_BOUNDS.map(() => []);
  for (let member of members) {
    const nDevs = member.data.annualReports[0].averageNumberOfDevs;
    for (let idx in DEV_GROUP_BOUNDS) {
      const [max, min] = DEV_GROUP_BOUNDS[idx];
      if ((nDevs <= max || max == Infinity) && nDevs >= min) {
        groups[idx].push(member);
        break;
      }
    }
  }
  return groups;
}

/**
 * Sorts members by the dollars per dev donated in their latest annual report.
 */
export function sortMembers(members: MemberWithId[]): MemberWithId[] {
  return members.toSorted((m1, m2) => {
    if (m1.data.annualReports.length == 0) {
      return 1;
    }
    if (m2.data.annualReports.length == 0) {
      return -1;
    }
    const dpd1 = getDollarsPerDev(m1.data.annualReports[0]);
    const dpd2 = getDollarsPerDev(m2.data.annualReports[0]);
    return dpd2 - dpd1;
  });
}
