#!/usr/bin/env -S npx tsx

// © 2025 Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0

// Must be run in repository root.

import fs from 'fs';
import memberRoles from '../../src/memberRoles.json';
const memberIds = Object.keys(memberRoles);

console.log('id,name,image,headline,text,cta');

for (const id of memberIds) {
    const localPath = `./src/content/members/${id}.json`;

    let member = undefined;
    try {
      member = JSON.parse(fs.readFileSync(localPath).toString());
    } catch (e) {
      console.error(`ERROR: could not load member data at ${localPath}`, e);
      process.exit(1);
    }

    console.log(`${id},${member["name"]},ad-${id}.png,No burnout.,Fewer vulns. Pay maintainers like ${member["name"]} does!,Join the Open Source Pledge. 💃🏻 `);
}
