#!/usr/bin/env -S npx tsx

// © 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

// Must be run in repository root.

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

    let member = undefined;
    try {
      member = JSON.parse(fs.readFileSync(localPath).toString());
    } catch (e) {
      console.error(`ERROR: could not load member data at ${localPath}`);
      process.exit(1);
    }

    if (isReportOverdue(member)) {
      await makeIssueIfNotExists(octokit, MemberException.ReportOverdue, member);
    } else if (isReportDueSoon(member)) {
      await makeIssueIfNotExists(octokit, MemberException.ReportDueSoon, member);
    }
    if (await isMemberUrlNotRetrievable(member)) {
      await makeIssueIfNotExists(octokit, MemberException.MemberUrlNotRetrievable, member);
    }
    if (await isReportUrlNotRetrievable(member)) {
      await makeIssueIfNotExists(octokit, MemberException.ReportUrlNotRetrievable, member);
    }
  }
}


main()
