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
  return mockDevCounts.map((mockDevCount, idx): MemberWithId => {
    let newMember = { ...exampleMember } as Member;
    newMember.name = `Example Member (${mockDevCount} ${mockDevCount == 1 ? "Dev" : "Devs"})`;
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
