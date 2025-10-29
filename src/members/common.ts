// © 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
// © 2025 Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0

import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import fetch from 'node-fetch';
import * as z from 'zod';

export const memberReportSchema = z.object({
  url: z.string().url(),
  year: z.string(),
  reportDate: z.string().date(),
  averageNumberOfDevs: z.number().nonnegative(),
  usdAmountPaid: z.number().nonnegative(),
});

export const memberSchema = z.object({
  id: z.string(),
  role: z.enum(["Innovator", "Member", "Former Innovator", "Former Member"]),
  active: z.boolean(),
  name: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  url: z.string().url(),
  jobsUrl: z.string().url().optional(),
  blogProfileSlug: z.string().optional(),
  joinDate: z.string().date(),
  annualReports: memberReportSchema.array().nonempty(),
});

export type Member = z.infer<typeof memberSchema>;
export type MemberReport = z.infer<typeof memberReportSchema>;
export type MemberMap = {
  [id: string]: Member;
};
export type MemberParams = {
  onlyInactive?: boolean;
};

export enum MemberException {
  ReportDueSoon,
  ReportOverdue,
  MemberUrlNotRetrievable,
  ReportUrlNotRetrievable,
}

const MEMBER_ROOT = './data/members';

const REPO_OWNER = 'opensourcepledge';
const REPO_NAME = 'opensourcepledge.com';
const EXCEPTION_LABEL = 'member-exception';

export function getDollarsPerDev(report: MemberReport) {
  return report.usdAmountPaid / report.averageNumberOfDevs;
}

export function getAllTimeTotalRaised(members: Member[]) {
  let total = 0;
  members.forEach((member) => {
    member.annualReports.forEach((report) => {
      if (+report.year >= 2023) {
        total += report.usdAmountPaid;
      }
    });
  });
  return total;
}

export function getLastYearTotalRaised(members: Member[]) {
  let total = 0;
  members.forEach((member) => {
    total += member.annualReports[0].usdAmountPaid;
  });
  return total;
}

export function fmtCurrency(num: number) {
  return '$' + num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function fmtDevs(num: number) {
  return `${num} dev${num != 1 ? 's' : ''}`;
}

/**
 * Sorts members by the average number of devs in their latest annual report.
 */
export function sortMembersByDevs(members: Member[]): Member[] {
  return [...members].sort((m1, m2) => {
    if (m1.annualReports.length == 0) {
      return 1;
    }
    if (m2.annualReports.length == 0) {
      return -1;
    }
    const devs1 = m1.annualReports[0].averageNumberOfDevs;
    const devs2 = m2.annualReports[0].averageNumberOfDevs;
    if (devs1 == devs2) {
      const dpd1 = getDollarsPerDev(m1.annualReports[0]);
      const dpd2 = getDollarsPerDev(m2.annualReports[0]);
      return dpd2 - dpd1;
    } else {
      return devs2 - devs1;
    }
  });
}

/**
 * Sorts members by join date, newest first.
 */
export function sortMembersByJoinDate(members: Member[]): Member[] {
  return [...members].sort((m1, m2) => {
    return m2.joinDate.localeCompare(m1.joinDate);
  });
}

/**
 * Sorts members by the dollars per dev in their latest annual report.
 */
export function sortMembersByDollarsPerDev(members: Member[]): Member[] {
  return [...members].sort((m1, m2) => {
    if (m1.annualReports.length == 0) {
      return 1;
    }
    if (m2.annualReports.length == 0) {
      return -1;
    }
    const dpd1 = getDollarsPerDev(m1.annualReports[0]);
    const dpd2 = getDollarsPerDev(m2.annualReports[0]);
    return dpd2 - dpd1;
  });
}


export function sortReportsForMember(member: Member): Member {
  const sortedReports = [...member.annualReports].sort((a, b) =>
    new Date(a.year) < new Date(b.year) ? 1 : -1
  );

  return {
    ...member,
    annualReports: sortedReports as [
      MemberReport,
      ...MemberReport[],
    ],
  }
}

export function isReportDueSoon(member: Member) {
  const sortedMember = sortReportsForMember(member);
  const latestReportEndDate = dayjs(sortedMember.annualReports[0].reportDate);
  return latestReportEndDate.isBefore(dayjs().subtract(1, 'year').add(2, 'months'));
}

export function isReportOverdue(member: Member) {
  const sortedMember = sortReportsForMember(member);
  const latestReportEndDate = dayjs(sortedMember.annualReports[0].reportDate);
  return latestReportEndDate.isBefore(dayjs().subtract(1, 'year'));
}

async function makeHeadRequest(url: string) {
  return fetch(url, {
    method: 'HEAD',
  });
}

export async function isMemberUrlNotRetrievable(member: Member) {
  const MAX_N_ATTEMPTS = 5;
  let n_attempts = 0;
  while (true) {
    try {
      console.log(`GET ${member.url}`);
      const res = await makeHeadRequest(member.url);
      if (res.status == 429) {
        console.log('Got 429, skipping...');
        break;
      }
      if (res.status != 200) {
        throw new Error(`Status code was ${res.status}`, { cause: res });
      }
      break;
    } catch (e) {
      console.error(e);
      n_attempts += 1;
      if (n_attempts >= MAX_N_ATTEMPTS) {
        return true;
      }
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  return false;
}

export async function isReportUrlNotRetrievable(member: Member) {
  for (const report of member.annualReports) {
    const MAX_N_ATTEMPTS = 5;
    let n_attempts = 0;
    while (true) {
      try {
        console.log(`GET ${report.url}`);
        const res = await makeHeadRequest(report.url);
        if (res.status == 429) {
          console.log('Got 429, skipping...');
          break;
        }
        if (res.status != 200) {
          throw new Error(`Status code was ${res.status}`, { cause: res });
        }
        break;
      } catch (e) {
        console.error(e);
        n_attempts += 1;
        if (n_attempts >= MAX_N_ATTEMPTS) {
          return true;
        }
        await new Promise(r => setTimeout(r, 2000));
      }
    }
  }
  return false;
}

function makeExceptionName(exception: MemberException) {
  switch (exception) {
    case MemberException.ReportDueSoon:
      return "annual report due soon";
    case MemberException.ReportOverdue:
      return "annual report overdue";
    case MemberException.MemberUrlNotRetrievable:
      return "member URL not retrievable";
    case MemberException.ReportUrlNotRetrievable:
      return "report URL not retrievable";
  }
}

function makeIssueTitle(
  exception: MemberException,
  member: Member,
) {
  const exceptionName = makeExceptionName(exception);
  return `${member.name}: ${exceptionName}`;
}

function makeIssueBody(
  exception: MemberException,
  member: Member,
) {
  const sortedMember = sortReportsForMember(member);
  const prevReportDate = sortedMember.annualReports[0].reportDate;
  const targetReportDate = dayjs(prevReportDate).add(1, 'year');
  const formattedTargetReportDate = targetReportDate.format('YYYY-MM-DD');
  const dayDiff = targetReportDate.diff(dayjs(), 'day');

  if (exception == MemberException.ReportDueSoon) {
    return `${member.name} last submitted a report for the year ending ${prevReportDate}.

This means an annual report is due in the next ${dayDiff} days.`;
  } else if (exception == MemberException.ReportOverdue) {
    return `${member.name} last submitted a report for the year ending ${prevReportDate}.

An annual report was due for ${formattedTargetReportDate}. This means an annual report is now overdue.`;
  } else if (exception == MemberException.MemberUrlNotRetrievable) {
    return `${member.name}'s \`url\` could not be retrieved. Please check the following URL: ${member.url}.`;
  } else if (exception == MemberException.ReportUrlNotRetrievable) {
    const urls = member.annualReports.map((r) => `* ${r.url}`).join("\n");
    return `${member.name} is providing a report URL that could not be retrieved. Please check the following report URLs:

${urls}`;
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
  member: Member,
) {
  const issueTitle = makeIssueTitle(exception, member);
  const issueBody = makeIssueBody(exception, member);
  const doesIssueExist = await doesExceptionIssueExist(octokit, issueTitle);
  if (doesIssueExist) {
    console.log(`Not creating an exception issue, because it already exists: “${issueTitle}”`);
    return;
  }
  console.log(`Creating exception issue: “${issueTitle}”`);
  createExceptionIssue(octokit, issueTitle, issueBody);
}

export function getMembers(params?: MemberParams): Member[] {
  const memberPaths = fs.readdirSync('./data/members')
    .filter((memberPath) => path.extname(memberPath) == '.json');
  const members = memberPaths.map((memberPath) => {
    return memberSchema.parse(
      JSON.parse(
        fs.readFileSync(
          path.join(MEMBER_ROOT, memberPath)
        ).toString()
      )
    );
  });
  return members
    .filter((member) => member.active == !(params && params.onlyInactive))
    .filter((member) => member.annualReports.length > 0)
    .map(sortReportsForMember);
}

export function getMembersAsMap(params?: MemberParams): MemberMap {
  let emptyMemberMap: MemberMap = {};
  return getMembers(params)
    .reduce((memberMap, member) => {
      memberMap[member.id] = member;
      return memberMap;
    }, emptyMemberMap);
}
