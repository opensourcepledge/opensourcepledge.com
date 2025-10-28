#!/usr/bin/env -S npx tsx

// © 2025 Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0

// Must be run in repository root.

import { getMembers } from '../../src/members/common.ts';
const members = getMembers();

console.log('id,name,image,headline,text,cta');

for (const member of members) {
    console.log(`${member.id},${member.name},ad-${member.id}.png,No burnout.,Fewer vulns. Pay maintainers like ${member.name} does!,Join the Open Source Pledge. 💃🏻 `);
}
