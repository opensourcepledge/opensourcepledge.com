// © 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

import memberRoles from "./memberRoles.json"
import type { Map } from './util.ts';
import type { MemberWithId, MemberReport } from "./schemas/members.ts";
import { getCollection } from 'astro:content';
import { sortReportsForMemberWithId } from "./memberData/common.ts";

export async function getMembers(): Promise<MemberWithId[]> {
  return (await getCollection('members'))
    .filter((member) => member.id in (memberRoles as Map))
    .map(sortReportsForMemberWithId);
}

export function getDollarsPerDev(report: MemberReport) {
  return report.usdAmountPaid / report.averageNumberOfDevs;
}

export async function getGrandTotalRaised() {
  const members = filterInactiveMembers(await getMembers());
  let grandTotal = 0;
  members.forEach((member) => {
    const sortedAnnualReports = member.data.annualReports.sort((a, b) => {
      if (a.dateYearEnding > b.dateYearEnding) {
        return -1;
      } else if (a.dateYearEnding < b.dateYearEnding) {
        return 1;
      } else {
        return 0;
      }
    });
    const report = sortedAnnualReports[0];
    const reportDate = Date.parse(report.dateYearEnding);
    const currentYear = (new Date()).getFullYear();
    const oneYearAgo = (new Date()).setFullYear(currentYear - 1);
    if (reportDate > oneYearAgo) {
      grandTotal += report.payments;
    }
  });
  return grandTotal;
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
  return [...members].sort((m1, m2) => {
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
  return [...members].sort((m1, m2) => {
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

