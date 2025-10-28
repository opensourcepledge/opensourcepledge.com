#!/usr/bin/env -S npx tsx

// © 2025 Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0

// Must be run in repository root.

import { getMembers, getGrandTotalRaised, fmtCurrency } from '../common.ts';

async function main() {
  console.log(fmtCurrency(getGrandTotalRaised(getMembers())));
}

main();
