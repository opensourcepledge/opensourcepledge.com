#!/usr/bin/env -S npx tsx

// © Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0
// Written by Vlad-Stefan Harbuz <vlad@vlad.website>

// Must be run in repository root.

import { getMembers, getYearlyTotalsRaised } from '../common.ts';

async function main() {
  console.log(getYearlyTotalsRaised(getMembers()));
}

main();
