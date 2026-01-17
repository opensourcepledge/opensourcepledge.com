#!/usr/bin/env -S npx tsx

// © Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0

// Must be run in repository root.

import { getMembers, getAllTimeTotalRaised, fmtCurrency } from '../common.ts';

async function main() {
  console.log(fmtCurrency(getAllTimeTotalRaised(getMembers())));
}

main();
