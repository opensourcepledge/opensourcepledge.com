#!/usr/bin/env -S npx tsx

// © 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

import fs from "fs";
import fetch from "node-fetch";
import { Octokit } from "@octokit/rest";

import {
  isBlogPostNotFound, isReportDueSoon, isReportOverdue, makeIssueIfNotExists,
} from "../common.ts";
import { MemberException } from "../common.ts";


const USAGE = `USAGE: ./updateMember.ts foocorp https://foocorp.example.com/foocorp.json
Must be run in the repo's root.`;


async function main() {
  const args = process.argv.slice(2);
  if (args.length != 2) {
    console.error(USAGE);
    process.exit(1);
  }
  const slug = args[0];
  const url = args[1];

  if (!('GITHUB_TOKEN' in process.env)) {
    console.error('Please define the GITHUB_TOKEN environment variable with your personal access token.');
    process.exit(1);
  }
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  const localPath = `./src/content/members/${slug}.json`;
  console.log(`Fetching member: ${slug}`);
  console.log(`\t* Remote URL: ${url}`);
  console.log(`\t* Local path: ${localPath}`);

  if (fs.existsSync(localPath + '.lock')) {
    return;
  }

  let remoteMemberData = undefined;
  try {
    remoteMemberData = await fetch(url)
      .then((res) => res.text())
      .then((text) => JSON.parse(text));
  } catch (e) {
    await makeIssueIfNotExists(octokit, MemberException.JsonFileNotAccessible, slug, url, undefined);
    return;
  }

  if (isReportOverdue(remoteMemberData)) {
    await makeIssueIfNotExists(octokit, MemberException.ReportOverdue, slug, url, remoteMemberData);
  } else if (isReportDueSoon(remoteMemberData)) {
    await makeIssueIfNotExists(octokit, MemberException.ReportDueSoon, slug, url, remoteMemberData);
  } else if (await isBlogPostNotFound(remoteMemberData)) {
    await makeIssueIfNotExists(octokit, MemberException.BlogPostNotFound, slug, url, remoteMemberData);
  }

  try {
    fs.writeFileSync(localPath, JSON.stringify(remoteMemberData, null, 2));
  } catch (e) {
    console.error(`ERROR: Failed to write to ${localPath}`, e);
    process.exit(1);
  }
}


main()
