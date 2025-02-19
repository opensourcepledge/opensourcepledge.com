#!/usr/bin/env -S npx tsx

// © 2024 Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0

// Must be run in repository root.

import fs from "fs";

import memberRoles from "../../memberRoles.json";
import { sortReportsForMember, fmtCurrency } from "../common.ts";


async function main() {
  let grandTotal = 0;
  const memberSlugs = Object.keys(memberRoles);

  for (const slug of memberSlugs) {
    const localPath = `./src/content/members/${slug}.json`;

    let member = undefined;
    try {
      member = JSON.parse(fs.readFileSync(localPath).toString());
    } catch (e) {
      console.error(`ERROR: could not load member data at ${localPath}`);
      process.exit(1);
    }

    member = sortReportsForMember(member);
    grandTotal += member.annualReports[0].usdAmountPaid;
  }

  console.log(fmtCurrency(grandTotal));
}


main()
