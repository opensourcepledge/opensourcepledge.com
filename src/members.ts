// © 2024 Vlad-Stefan Harbuz <vlad@vladh.net>
// SPDX-License-Identifier: Apache-2.0

import { getCollection } from 'astro:content';
import type { MemberWithId, MemberReport } from "./content/config.ts";

export async function getMembers(): Promise<MemberWithId[]> {
  const members = await getCollection('members');
  return members.map(sortReportsForMember);
}

export function getDollarsPerDev(report: MemberReport) {
  return report.payments / report.averageNumberOfDevs;
}

export function fmtCurrency(num: number) {
  return '$' + num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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
 * Puts members into groups based on the dollars per dev in their latest
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
 * Sorts members by the average number of devs in their latest annual report.
 */
export function sortMembersByDevs(members: MemberWithId[]): MemberWithId[] {
  return members.toSorted((m1, m2) => {
    if (m1.data.annualReports.length == 0) {
      return 1;
    }
    if (m2.data.annualReports.length == 0) {
      return -1;
    }
    const devs1 = m1.data.annualReports[0].averageNumberOfDevs;
    const devs2 = m2.data.annualReports[0].averageNumberOfDevs;
    if (devs1 == devs2) {
      const dpd1 = getDollarsPerDev(m1.data.annualReports[0]);
      const dpd2 = getDollarsPerDev(m2.data.annualReports[0]);
      return dpd2 - dpd1;
    } else {
      return devs2 - devs1;
    }
  });
}

/**
 * Sorts members by the dollars per dev in their latest annual report.
 */
export function sortMembersByDollarsPerDev(members: MemberWithId[]): MemberWithId[] {
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

function sortReportsForMember(member: MemberWithId): MemberWithId {
  const sortedReports = member.data.annualReports.toSorted((a, b) =>
    new Date(a.dateYearEnding) < new Date(b.dateYearEnding) ? 1 : -1
  );

  return {
    ...member,
    data: {
      ...member.data,
      annualReports: sortedReports as [
        MemberReport,
        ...MemberReport[],
      ],
    },
  };
}
