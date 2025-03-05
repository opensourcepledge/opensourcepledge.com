// © 2025 Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0

import fetch from "node-fetch";

import memberRoles from "../memberRoles.json";
import type { Member } from "../schemas/members.ts";

type JobSet = {
  dateFetched: Date,
  companies: {
    [id: string]: any;
  };
}

type Job = {
  title: string;
  url: string;
};
type JobGetter = ((jobsUrl: string) => Promise<Job[]>);

type AshbyAppData = {
  organization: {
    name: string;
  };
  jobBoard: {
    jobPostings: {
      id: string;
      title: string;
    }[];
  };
};

async function getJobsForAshbyUrl(jobsUrl: string) {
  const page = await (await fetch(jobsUrl)).text();

  const reAppData = /window.__appData = (.*);\n/;
  const matches = page.match(reAppData);
  if (!matches || matches.length < 2) {
    console.warn(`Could not get appData from Ashby URL: ${jobsUrl}`);
    return [];
  }

  try {
    const appData: AshbyAppData = JSON.parse(matches[1]);
    const orgName = appData.organization.name;
    const jobPostings = appData.jobBoard.jobPostings;
    return jobPostings.map((posting) => ({
      title: posting.title,
      url: `https://jobs.ashbyhq.com/${orgName}/${posting.id}`,
    }));
  } catch(e) {
    console.warn(`Could not get appData from Ashby URL: ${jobsUrl}`);
    return [];
  }
}

// async function getJobsForWorkableUrl(jobsUrl: string) {
//   return [];
// }

// async function getJobsForGreenhouseEmbedUrl(jobsUrl: string) {
//   return [];
// }

// async function getJobsForGreenhouseListUrl(jobsUrl: string) {
//   return [];
// }

// async function getJobsForGreenhouseTabularUrl(jobsUrl: string) {
//   return [];
// }

// async function getJobsForLeverUrl(jobsUrl: string) {
//   return [];
// }

// async function getJobsForEmergeToolsUrl(jobsUrl: string) {
//   return [];
// }

// async function getJobsForHeroDevsUrl(jobsUrl: string) {
//   return [];
// }

async function getJobsForUrl(jobsUrl: string) {
  const patternPairs: [RegExp, JobGetter][] = [
    [/jobs.ashbyhq.com/, getJobsForAshbyUrl],
    // [/apply.workable.com/, getJobsForWorkableUrl],
    // [/boards.greenhouse.io\/embed/, getJobsForGreenhouseEmbedUrl],
    // [/boards.greenhouse.io\/(?!embed)/, getJobsForGreenhouseListUrl],
    // [/job-boards.greenhouse.io/, getJobsForGreenhouseTabularUrl],
    // [/jobs.lever.co/, getJobsForLeverUrl],
    // [/www.emergetools.com/, getJobsForEmergeToolsUrl],
    // [/www.herodevs.com/, getJobsForHeroDevsUrl],
  ];
  for (const [pattern, getterFn] of patternPairs) {
    if (pattern.test(jobsUrl)) {
      return getterFn(jobsUrl);
    }
  }
  console.warn(`Do not know how to get jobs for URL: ${jobsUrl}`);
  return [];
}

export async function getJobSet() {
  let jobSet: JobSet = {
    companies: {},
    dateFetched: new Date(),
  };
  const memberSlugs = Object.keys(memberRoles);
  for (const memberSlug of memberSlugs) {
    const member: Member = await import(`../content/members/${memberSlug}.json`);
    if (member.jobsUrl) {
      jobSet.companies[memberSlug] = await getJobsForUrl(member.jobsUrl);
    }
  }
  return jobSet;
}
