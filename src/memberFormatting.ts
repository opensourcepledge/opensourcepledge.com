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
    grandTotal += member.data.annualReports[0].usdAmountPaid;
  });
  return grandTotal;
}

export function fmtCurrency(num: number) {
  return '$' + num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function fmtDevs(num: number) {
  return `${num} dev${num != 1 ? 's' : ''}`;
}

export function filterInactiveMembers(members: MemberWithId[]): MemberWithId[] {
  return members.filter((m) => m.data.annualReports.length > 0);
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

