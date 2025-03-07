// © 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

import memberRoles from "./memberRoles.json"
import type { Map } from './util.ts';
import type { MemberWithId, MemberMap } from "./schemas/members.ts";
import { getCollection } from 'astro:content';
import { sortReportsForMemberWithId } from "./memberData/common.ts";

export async function getMembers(): Promise<MemberWithId[]> {
  return (await getCollection('members'))
    .filter((member) => member.id in (memberRoles as Map))
    .filter((member) => member.data.annualReports.length > 0)
    .map(sortReportsForMemberWithId);
}

export async function getMembersAsMap(): Promise<MemberMap> {
  let emptyMemberMap: MemberMap = {};
  return (await getCollection('members'))
    .filter((member) => member.id in (memberRoles as Map))
    .filter((member) => member.data.annualReports.length > 0)
    .map(sortReportsForMemberWithId)
    .reduce((memberMap, member) => {
      memberMap[member.id] = member.data;
      return memberMap;
    }, emptyMemberMap);
}
