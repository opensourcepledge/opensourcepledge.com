import { getCollection } from 'astro:content';
import type { MemberReport } from "./content/config.ts";
import exampleMember from '../contrib/example-schema.json';

const isDev = import.meta.env.DEV;

/**
 * Generates some member data for testing to be used in dev mode.
 */
function getMockMembers() {
  const mockDevCounts = [
    1, 34, 79, 230, 1004, 4052, 10245, 11245, 17353, 21324, 50124,
  ]
  return mockDevCounts.map((mockDevCount, idx) => {
    let newMember = structuredClone(exampleMember);
    newMember.name = `Example Member (${mockDevCount} ${mockDevCount == 1 ? "Dev" : "Devs"})`;
    newMember.urlSquareLogoWithBackground = `/example-member-${idx}.svg`;
    newMember.annualReports = newMember.annualReports.map((report) => {
      report.averageNumberOfDevs = mockDevCount;
      return report;
    });
    return {
      id: `example-member-${idx}`,
      data: newMember,
    };
  });
}

export async function getMembers() {
  if (isDev) {
    return getMockMembers();
  } else {
    return getCollection('members');
  }
}

export function getReportCashTotal(report: MemberReport) {
  return report.monetaryPayments
    .map((d) => d.amount)
    .reduce((acc, d) => acc + d, 0);
}

export function getReportFullTotal(report: MemberReport) {
  return getReportCashTotal(report) + report.monetaryValueOfTime + report.monetaryValueOfMaterials;
}

export function getDollarsPerDev(report: MemberReport) {
  return getReportCashTotal(report) / report.averageNumberOfDevs;
}

export function fmtCurrency(num: number) {
  return '$' + num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
