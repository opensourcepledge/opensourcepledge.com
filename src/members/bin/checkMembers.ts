#!/usr/bin/env -S npx tsx

// © Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

// Must be run in repository root.

import { Octokit } from '@octokit/rest';

import {
  isReportDueSoon,
  isReportOverdue,
  isMemberUrlNotRetrievable,
  isReportUrlNotRetrievable,
  makeIssueIfNotExists,
} from '../common.ts';
import { getMembers } from '../../members/common.ts';
import { MemberException } from '../common.ts';


async function main() {
  if (!('GITHUB_TOKEN' in process.env)) {
    console.error('Please define the GITHUB_TOKEN environment variable with your personal access token.');
    process.exit(1);
  }
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  const members = getMembers();

  for (const member of members) {
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
