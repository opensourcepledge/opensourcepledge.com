// © 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

import memberRoles from "./memberRoles.json"
import type { Map } from './util.ts';
import type { MemberWithId } from "./schemas/members.ts";
import { getCollection } from 'astro:content';
import { sortReportsForMemberWithId } from "./memberData/common.ts";

export async function getMembers(): Promise<MemberWithId[]> {
  return (await getCollection('members'))
    .filter((member) => member.id in (memberRoles as Map))
    .map(sortReportsForMemberWithId);
}
