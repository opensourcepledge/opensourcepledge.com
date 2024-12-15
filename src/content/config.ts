// © 2024 Functional Software, Inc. dba Sentry
// © 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

import { defineCollection } from "astro:content";
import { memberSchema } from '../schemas/members';

export const collections = {
  members: defineCollection({
    type: "data",
    schema: memberSchema,
  }),
};
