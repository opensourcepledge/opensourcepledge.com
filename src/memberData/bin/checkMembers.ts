#!/usr/bin/env -S npx tsx

// © 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

import fs from "fs";
import { Octokit } from "@octokit/rest";

import {
  isReportDueSoon,
  isReportOverdue,
  isMemberUrlNotRetrievable,
  isReportUrlNotRetrievable,
  makeIssueIfNotExists,
} from "../common.ts";
import memberRoles from "../../memberRoles.json";
import { MemberException } from "../common.ts";


async function main() {
  if (!('GITHUB_TOKEN' in process.env)) {
    console.error('Please define the GITHUB_TOKEN environment variable with your personal access token.');
    process.exit(1);
  }
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  const memberSlugs = Object.keys(memberRoles);

  for (const slug of memberSlugs) {
    const localPath = `./src/content/members/${slug}.json`;
    console.log(`Checking member ${slug} at ${localPath}`);

    let memberData = undefined;
    try {
      memberData = JSON.parse(fs.readFileSync(localPath).toString());
    } catch (e) {
      console.error(`ERROR: could not load member data at ${localPath}`);
      process.exit(1);
    }

    if (isReportOverdue(memberData)) {
      await makeIssueIfNotExists(octokit, MemberException.ReportOverdue, memberData);
    } else if (isReportDueSoon(memberData)) {
      await makeIssueIfNotExists(octokit, MemberException.ReportDueSoon, memberData);
    }
    if (await isMemberUrlNotRetrievable(memberData)) {
      await makeIssueIfNotExists(octokit, MemberException.MemberUrlNotRetrievable, memberData);
    }
    if (await isReportUrlNotRetrievable(memberData)) {
      await makeIssueIfNotExists(octokit, MemberException.ReportUrlNotRetrievable, memberData);
    }
  }
}


main()
