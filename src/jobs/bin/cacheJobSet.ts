#!/usr/bin/env -S npx tsx

// © 2025 Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0

// Must be run in repository root.

import * as fs from 'fs';
import { getJobSet } from '../index.ts';

try {
  const jobSet = await getJobSet();
  const nCompanies = Object.keys(jobSet.companies).length;
  let nTotalJobs = 0;
  Object.keys(jobSet.companies).forEach((k) => {
    nTotalJobs += jobSet.companies[k].length;
  });

  console.log(`Got ${nTotalJobs} jobs for ${nCompanies} companies`);
  if (nTotalJobs == 0) {
    throw new Error('Got a total of 0 jobs. This seems funny. Aborting');
  }

  const jobSetString = JSON.stringify(jobSet);
  fs.writeFileSync('src/cache/jobSet.json', jobSetString);
  console.log('Saved to cache');
} catch (e) {
  console.error(e);
}
