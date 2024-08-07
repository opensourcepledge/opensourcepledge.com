import { getCollection } from 'astro:content';
import type { MemberReport } from "./content/config.ts";
import exampleMember from '../contrib/example-schema.json';

const isDev = import.meta.env.DEV;

export async function getMembers() {
  if (isDev) {
    // In development mode, generate some mock data for testing.
    const mockDevCounts = [
      1, 34, 79, 230, 1004, 4052, 10245, 11245, 17353, 21324, 50124,
    ]
    return mockDevCounts.map((mockDevCount) => {
      let newMember = structuredClone(exampleMember);
      newMember.name = `Sentry ${mockDevCount}`;
      newMember.annualReports = newMember.annualReports.map((report) => {
        report.averageNumberOfDevs = mockDevCount;
        return report;
      });
      return {
        id: `sentry-${mockDevCount}`,
        data: newMember,
      };
    });
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
