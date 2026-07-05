#!/usr/bin/env -S npx tsx

// © Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0
// Written by Vlad-Stefan Harbuz <vlad@vlad.website>

// Must be run in repository root.

import * as fs from 'fs';
import {
  getMembers,
  getAllTimeTotalRaised,
  getLastYearTotalRaised,
  sortMembersByDevs,
} from '../common.ts';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const activeMembers = getMembers();
const allMembers = getMembers({ includeInactive: true });
const maxNDevs = sortMembersByDevs(activeMembers)[0].annualReports[0].averageNumberOfDevs;
const allTimeTotal = Math.floor(getAllTimeTotalRaised(allMembers));
const lastYearTotal = Math.floor(getLastYearTotalRaised(activeMembers));

const timestamp = dayjs().utc().format('YYYY-MM-DD');
const outputData = `${lastYearTotal},${allTimeTotal},${maxNDevs}`;
const outputLine = `${timestamp},${outputData}`;

console.log(`Current tally: ${outputLine}`);

const historyPath = 'data/history.csv';

const existingHistory = fs.readFileSync(historyPath).toString();
const existingLines = existingHistory.split('\n');

if (existingLines.length > 0) {
  const firstLine = existingLines[0];
  const firstCommaIdx = firstLine.indexOf(',');
  const firstData = firstLine.slice(firstCommaIdx + 1);
  if (firstData == outputData) {
    console.log('No history changes to write. Did nothing.');
  } else {
    const newHistory = `${outputLine}\n${existingHistory}`;
    fs.writeFileSync(historyPath, newHistory);
    console.log(`Prepended a new history line to ${historyPath}`);
    console.log(outputLine)
  }
} else {
  fs.writeFileSync(historyPath, outputLine);
  console.log(`Wrote a new history file to ${historyPath}`);
  console.log(outputLine)
}
