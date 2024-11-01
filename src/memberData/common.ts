// © 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

import dayjs from 'dayjs';
import fetch from "node-fetch";

import type { Member, MemberWithId, MemberReport } from "../content/config.ts";

export enum MemberException {
  JsonFileNotAccessible,
  ReportDueSoon,
  ReportOverdue,
  BlogPostNotFound,
}

const REPO_OWNER = 'opensourcepledge';
const REPO_NAME = 'opensourcepledge.com';
const EXCEPTION_LABEL = 'member-exception';

export function sortReportsForMember(member: Member): Member {
  const sortedReports = [...member.annualReports].sort((a, b) =>
    new Date(a.dateYearEnding) < new Date(b.dateYearEnding) ? 1 : -1
  );

  return {
    ...member,
    annualReports: sortedReports as [
      MemberReport,
      ...MemberReport[],
    ],
  }
}

export function sortReportsForMemberWithId(member: MemberWithId): MemberWithId {
  return {
    ...member,
    data: sortReportsForMember(member.data),
  };
}

export function isReportDueSoon(member: Member) {
  const sortedMember = sortReportsForMember(member);
  const latestReportEndDate = dayjs(sortedMember.annualReports[0].dateYearEnding);
  return latestReportEndDate.isBefore(dayjs().subtract(1, 'year').add(2, 'months'));
}

export function isReportOverdue(member: Member) {
  const sortedMember = sortReportsForMember(member);
  const latestReportEndDate = dayjs(sortedMember.annualReports[0].dateYearEnding);
  return latestReportEndDate.isBefore(dayjs().subtract(1, 'year'));
}

export async function isBlogPostNotFound(member: Member) {
  for (const report of member.annualReports) {
    try {
      const res = await fetch(report.url, { method: 'HEAD' })
      if (res.status != 200) {
        return true;
      }
    } catch (e) {
      return true;
    }
  }
  return false;
}

function makeExceptionName(exception: MemberException) {
  switch (exception) {
    case MemberException.JsonFileNotAccessible:
      return "JSON file not accessible";
    case MemberException.ReportDueSoon:
      return "annual report due soon";
    case MemberException.ReportOverdue:
      return "annual report overdue";
    case MemberException.BlogPostNotFound:
      return "blog post not found";
  }
}

function makeIssueTitle(
  exception: MemberException,
  slug: string,
  _url: string,
  member?: Member,
) {
  const memberName = member ? member.name : slug;
  const exceptionName = makeExceptionName(exception);
  return `${memberName}: ${exceptionName}`;
}

function makeIssueBody(
  exception: MemberException,
  slug: string,
  url: string,
  member?: Member,
) {
  if (exception == MemberException.JsonFileNotAccessible) {
    return `Member ${slug} has specified the following URL for their JSON file: ${url}.

However, this file could not be fetched.`;
  } else {
    if (!member) {
      console.error(`Couldn't get member data for ${slug} when it was required.`);
      process.exit(1);
    }
    const sortedMember = sortReportsForMember(member);
    const prevReportDate = sortedMember.annualReports[0].dateYearEnding;
    const targetReportDate = dayjs(prevReportDate).add(1, 'year');
    const formattedTargetReportDate = targetReportDate.format('YYYY-MM-DD');
    const dayDiff = targetReportDate.diff(dayjs(), 'day');

    if (exception == MemberException.ReportDueSoon) {
      return `${member.name} last submitted a report for the year ending ${prevReportDate}.

This means an annual report is due in the next ${dayDiff} days.`;
    } else if (exception == MemberException.ReportOverdue) {
      return `${member.name} last submitted a report for the year ending ${prevReportDate}.

An annual report was due for ${formattedTargetReportDate}. This means an annual report is now overdue.`;
    } else if (exception == MemberException.BlogPostNotFound) {
      const urls = member.annualReports.map((r) => `* ${r.url}`).join("\n");
      return `${member.name} is providing a blog post URL that could not be found. Please check the following URLs:

${urls}`;
    }
  }
  return 'Unknown exception occured.'
}

async function createExceptionIssue(octokit: any, title: string, body: string) {
  await octokit.rest.issues.create({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    labels: [EXCEPTION_LABEL],
    title: title,
    body: body,
  });
}

async function getExceptionIssues(octokit: any) {
  const { data: issues } = await octokit.rest.issues.listForRepo({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    labels: [EXCEPTION_LABEL],
    per_page: 100,
  });
  return issues;
}

async function doesExceptionIssueExist(octokit: any, title: string) {
  // NOTE: Because we're ignoring the pagination, this function cannot find
  // `member-exception` issues that are more than 100 issues old. This means
  // that, if an issue is opened for an exception, and that issue remains open,
  // and 100 other `member-exception` issues are then created, this program
  // will erroneously create the issue again. This is unlikely to happen — if
  // we reach that kind of scale, we need some other solution than GitHub
  // issues. Therefore, this can probably be ignored.
  const issues = await getExceptionIssues(octokit);
  // NOTE: Could get type information from @octokit/types, but the types can
  // only be constructed at runtime, which means we need to wrap this whole
  // file in a function, and...it's honestly not worth the bother.
  return issues.some((issue: any) => issue.title == title);
}

export async function makeIssueIfNotExists(
  octokit: any,
  exception: MemberException,
  slug: string,
  url: string,
  member?: Member,
) {
  const issueTitle = makeIssueTitle(exception, slug, url, member);
  const issueBody = makeIssueBody(exception, slug, url, member);
  const doesIssueExist = await doesExceptionIssueExist(octokit, issueTitle);
  if (doesIssueExist) {
    console.log(`Not creating an exception issue, because it already exists: “${issueTitle}”`);
    return;
  }
  console.log(`Creating exception issue: “${issueTitle}”`);
  createExceptionIssue(octokit, issueTitle, issueBody);
}
