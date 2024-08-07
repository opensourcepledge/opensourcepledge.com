import { z, defineCollection } from "astro:content";

/* Welcome to the schema for OSS Pledge.
 *
 * If you are implementing an OSS Pledge report for a member organization, and
 * need to understand how to format it, you've found the source of truth. If
 * you have questions or run into limitations, please open an issue:
 *
 *    https://github.com/getsentry/osspledge.com/issues/new
 *
 */

const monetaryPayment = z.object({
  amount: z.number().nonnegative(),
  urlDetails: z.string().url().optional(),
})

const memberReport = z.object({
  dateYearEnding: z.string().date(),
  averageNumberOfDevs: z.number().nonnegative(),
  monetaryPayments: monetaryPayment.array().nonempty(),
  monetaryValueOfTime: z.number().nonnegative(),
  monetaryValueOfMaterials: z.number().nonnegative(),
});

const memberProvidedData = z.object({
  name: z.string(),
  urlSquareLogoWithBackground: z.string().url(),
  urlLearnMore: z.string().url(),
  description: z.string().optional(),
  annualReports: memberReport.array().nonempty(),
});

const member = z.object({
  domain: z.string(),
  datetimeModified: z.string().datetime(),
}).merge(memberProvidedData);

export type Member = z.infer<typeof member>;
export type MemberReport = z.infer<typeof memberReport>;
export interface MemberWithId {
  id: string,
  data: Member,
}

export const collections = {
  members: defineCollection({
    type: "data",
    schema: member,
  }),
};
