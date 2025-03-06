// © 2024 Functional Software, Inc. dba Sentry
// © 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

import { z } from "astro:content";

export const memberReportSchema = z.object({
  url: z.string().url(),
  year: z.string(),
  reportDate: z.string().date(),
  averageNumberOfDevs: z.number().nonnegative(),
  usdAmountPaid: z.number().nonnegative(),
});

export const memberSchema = z.object({
  name: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  url: z.string().url(),
  jobsUrl: z.string().url().optional(),
  joinDate: z.string().date(),
  annualReports: memberReportSchema.array().nonempty(),
});

export type Member = z.infer<typeof memberSchema>;
export type MemberReport = z.infer<typeof memberReportSchema>;
export interface MemberWithId {
  id: string,
  data: Member,
};
export type MemberMap = {
  [id: string]: Member;
};
