#!/usr/bin/env -S npx tsx

// © 2025 Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0

import { getJobSet } from '../index.ts';

console.log(JSON.stringify(await getJobSet()));
