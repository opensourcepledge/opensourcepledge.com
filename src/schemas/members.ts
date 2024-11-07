import { z } from "astro:content";

/* Welcome to the schema for the Open Source Pledge.
 *
 * If you are implementing an Open Source Pledge report for a member
 * organization, and need to understand how to format it, you've found the
 * source of truth. If you have questions or run into limitations, please open
 * an issue:
 *
 *    https://github.com/opensourcepledge/opensourcepledge.com/issues/new
 *
 */

export const memberReportSchema = z.object({
  url: z.string().url(),
  dateYearEnding: z.string().date(),
  averageNumberOfDevs: z.number().nonnegative(),
  payments: z.number().nonnegative(),
  // NOTE: Deprecated.
  monetaryValueOfTime: z.number().optional(),
  // NOTE: Deprecated.
  monetaryValueOfMaterials: z.number().optional(),
});

export const memberSchema = z.object({
  name: z.string(),
  // NOTE: Deprecated.
  urlSquareLogoWithBackground: z.string().url().optional(),
  urlLearnMore: z.string().url(),
  description: z.string().optional(),
  annualReports: memberReportSchema.array().nonempty(),
});

export type Member = z.infer<typeof memberSchema>;
export type MemberReport = z.infer<typeof memberReportSchema>;
export interface MemberWithId {
  id: string,
  data: Member,
}
