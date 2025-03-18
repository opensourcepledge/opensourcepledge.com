// © 2025 Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0

import fetch from "node-fetch";
import * as cheerio from 'cheerio';

import memberRoles from "../memberRoles.json";
import type { Member } from "../schemas/members.ts";

type Job = {
  title: string;
  url: string;
};

export type JobSet = {
  fetchedTimestamp: number,
  companies: {
    [id: string]: Job[];
  };
}

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

type WorkableJobsData = {
  total: number;
  results: {
    shortcode: string;
    title: string;
  }[];
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

async function getJobsForWorkableUrl(jobsUrl: string) {
  const reCompanyId = /apply.workable.com\/api\/v3\/accounts\/([a-zA-Z0-9-_]*)\/jobs/;
  const idMatches = jobsUrl.match(reCompanyId);
  if (!idMatches || idMatches.length < 2) {
    console.warn(`Could not get company ID from Workable URL: ${jobsUrl}`);
    return [];
  }
  const companyId = idMatches[1];
  let jobsData: WorkableJobsData;
  try {
    const res = await fetch(jobsUrl, {
      method: 'POST',
      body: '{"query":"","department":[],"location":[],"remote":[],"workplace":[],"worktype":[]}',
    });
    jobsData = (await res.json()) as WorkableJobsData;
    return jobsData.results.map((posting) => ({
      title: posting.title,
      url: `https://apply.workable.com/${companyId}/j/${posting.shortcode}/`,
    }));
  } catch(e) {
    console.warn(`Could not get job data from Workable URL: ${jobsUrl}`, e);
    return [];
  }
}

async function getJobsForLeverUrl(jobsUrl: string) {
  try {
    const page = await (await fetch(jobsUrl)).text();
    const $ = cheerio.load(page);
    const $postings = $('.posting-title');
    let jobs: Job[];
    jobs = $postings.map(function() {
      return {
        title: $(this).find('h5').text(),
        url: $(this).attr('href') || '',
      }
    }).toArray();
    return jobs;
  } catch(e) {
    console.warn(`Could not get job data from Lever URL: ${jobsUrl}`, e);
    return [];
  }
}

async function getJobsForGreenhouseListUrl(jobsUrl: string) {
  try {
    const page = await (await fetch(jobsUrl)).text();
    const $ = cheerio.load(page);
    const $postings = $('.opening a');
    let jobs: Job[];
    jobs = $postings.map(function() {
      let url = $(this).attr('href') || '';
      if (url.startsWith('/')) {
        url = `https://boards.greenhouse.io${url}`;
      }
      return {
        title: $(this).text(),
        url: url,
      }
    }).toArray();
    return jobs;
  } catch(e) {
    console.warn(`Could not get job data from Greenhouse list URL: ${jobsUrl}`, e);
    return [];
  }
}

async function getJobsForGreenhouseTabularUrl(jobsUrl: string) {
  try {
    const page = await (await fetch(jobsUrl)).text();
    const $ = cheerio.load(page);
    const $postings = $('.job-post a');
    let jobs: Job[];
    jobs = $postings.map(function() {
      return {
        title: $(this).children().first().text(),
        url: $(this).attr('href') || '',
      }
    }).toArray();
    return jobs;
  } catch(e) {
    console.warn(`Could not get job data from Greenhouse tabular URL: ${jobsUrl}`, e);
    return [];
  }
}

async function getJobsForEmergeToolsUrl(jobsUrl: string) {
  try {
    const page = await (await fetch(jobsUrl)).text();
    const $ = cheerio.load(page);
    const $postings = $('a[href^="/careers/jobs"]');
    let jobs: Job[];
    jobs = $postings.map(function() {
      return {
        title: $(this).text(),
        url: 'https://www.emergetools.com' + $(this).attr('href'),
      }
    }).toArray();
    return jobs;
  } catch(e) {
    console.warn(`Could not get job data from Emerge Tools URL: ${jobsUrl}`, e);
    return [];
  }
}

async function getJobsForHeroDevsUrl(jobsUrl: string) {
  try {
    const page = await (await fetch(jobsUrl)).text();
    const $ = cheerio.load(page);
    const $postings = $('a[href^="/job-posting/"]');
    let jobs: Job[];
    jobs = $postings.map(function() {
      return {
        title: $(this).children().first().text(),
        url: 'https://www.herodevs.com' + $(this).attr('href'),
      }
    }).toArray();
    return jobs;
  } catch(e) {
    console.warn(`Could not get job data from HeroDevs URL: ${jobsUrl}`, e);
    return [];
  }
}

async function getJobsForUrl(jobsUrl: string) {
  const patternPairs: [RegExp, JobGetter][] = [
    [/\/\/jobs\.ashbyhq\.com/, getJobsForAshbyUrl],
    [/\/\/apply\.workable\.com/, getJobsForWorkableUrl],
    [/\/\/jobs\.lever\.co/, getJobsForLeverUrl],
    [/\/\/boards\.greenhouse\.io\/embed/, getJobsForGreenhouseListUrl],
    [/\/\/boards\.greenhouse\.io\/(?!embed)/, getJobsForGreenhouseListUrl],
    [/\/\/job-boards\.greenhouse\.io/, getJobsForGreenhouseTabularUrl],
    [/\/\/www\.emergetools\.com/, getJobsForEmergeToolsUrl],
    [/\/\/www\.herodevs\.com/, getJobsForHeroDevsUrl],
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
    fetchedTimestamp: +(new Date()),
  };
  const memberSlugs = Object.keys(memberRoles);
  for (const memberSlug of memberSlugs) {
    const member: Member = await import(`../content/members/${memberSlug}.json`);
    if (member.jobsUrl) {
      console.log(`Getting jobs for ${memberSlug} from ${member.jobsUrl}`);
      const jobs = await getJobsForUrl(member.jobsUrl);
      console.log(`Got ${jobs.length} jobs`, jobs);
      jobSet.companies[memberSlug] = jobs;
    }
  }
  return jobSet;
}
