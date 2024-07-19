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

const monetaryPaymentsObject = z
  .object({
    // platforms from https://github.com/github/docs/blob/a9a9dd1f948b6e0257ed5da0a9b94cc1be2aa097/content/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/displaying-a-sponsor-button-in-your-repository.md
    community_bridge: z.number().nonnegative(),
    github: z.number().nonnegative(),
    issuehunt: z.number().nonnegative(),
    ko_fi: z.number().nonnegative(),
    liberapay: z.number().nonnegative(),
    open_collective: z.number().nonnegative(),
    patreon: z.number().nonnegative(),
    tidelift: z.number().nonnegative(),
    polar: z.number().nonnegative(),
    buy_me_a_coffee: z.number().nonnegative(),

    // foundations from https://github.com/Punderthings/fossfoundation/tree/bcdff88533dcd9bf90e2326db7a4363ac8344207/_foundations
    almalinux: z.number().nonnegative(),
    apereo: z.number().nonnegative(),
    asf: z.number().nonnegative(),
    benetech: z.number().nonnegative(),
    biobricks: z.number().nonnegative(),
    bytecode: z.number().nonnegative(),
    creativecommons: z.number().nonnegative(),
    django: z.number().nonnegative(),
    dotnet: z.number().nonnegative(),
    drupal: z.number().nonnegative(),
    eclipse: z.number().nonnegative(),
    eff: z.number().nonnegative(),
    ffpc: z.number().nonnegative(),
    freebsd: z.number().nonnegative(),
    fsf: z.number().nonnegative(),
    fsfe: z.number().nonnegative(),
    fsfse: z.number().nonnegative(),
    fsharp: z.number().nonnegative(),
    gentoo: z.number().nonnegative(),
    gnome: z.number().nonnegative(),
    haiku: z.number().nonnegative(),
    haskell: z.number().nonnegative(),
    idcommons: z.number().nonnegative(),
    isc: z.number().nonnegative(),
    joomla: z.number().nonnegative(),
    kde: z.number().nonnegative(),
    kuali: z.number().nonnegative(),
    lf: z.number().nonnegative(),
    lfcharities: z.number().nonnegative(),
    linuxkernel: z.number().nonnegative(),
    llvm: z.number().nonnegative(),
    mozilla: z.number().nonnegative(),
    netbsd: z.number().nonnegative(),
    numfocus: z.number().nonnegative(),
    oasis: z.number().nonnegative(),
    ocf: z.number().nonnegative(),
    oeglobal: z.number().nonnegative(),
    oisf: z.number().nonnegative(),
    olpc: z.number().nonnegative(),
    omsf: z.number().nonnegative(),
    opencompute: z.number().nonnegative(),
    openconnectivity: z.number().nonnegative(),
    openid: z.number().nonnegative(),
    openjsf: z.number().nonnegative(),
    openrobotics: z.number().nonnegative(),
    openstack: z.number().nonnegative(),
    openstreetmap: z.number().nonnegative(),
    opentransit: z.number().nonnegative(),
    osc: z.number().nonnegative(),
    oset: z.number().nonnegative(),
    osgeo: z.number().nonnegative(),
    osi: z.number().nonnegative(),
    owasp: z.number().nonnegative(),
    pculture: z.number().nonnegative(),
    perl: z.number().nonnegative(),
    plone: z.number().nonnegative(),
    postgresql: z.number().nonnegative(),
    python: z.number().nonnegative(),
    rails: z.number().nonnegative(),
    raspberrypi: z.number().nonnegative(),
    raspberrypina: z.number().nonnegative(),
    rubycentral: z.number().nonnegative(),
    rust: z.number().nonnegative(),
    sahana: z.number().nonnegative(),
    scale: z.number().nonnegative(),

    other: z.number().nonnegative(),
  })
  .strict() // no unknown keys allowed
  .partial() // okay if not all present
  .refine(
    // but need at least one - stackoverflow.com/a/73294947
    (obj) => Object.values(obj).some((v) => v !== undefined),
    "Monetary payments must include at least one valid entry.",
  );

const memberProvidedData = z.object({
  name: z.string(),
  urlLogoWithBackground: z.string().url(),
  urlLearnMore: z.string().url(),
  annualReports: z
    .object({
      dateYearEnding: z.string().date(),
      averageNumberOfDevs: z.number().nonnegative(),
      monetaryPayments: monetaryPaymentsObject,
      monetaryValueOfTime: z.number().nonnegative(),
      monetaryValueOfMaterials: z.number().nonnegative(),
    })
    .array()
    .nonempty(),
});

export const collections = {
  members: defineCollection({
    type: "data",
    schema: z
      .object({
        domain: z.string(),
        urlSource: z.string().url(),
        datetimeModified: z.string().datetime(),
      })
      .merge(memberProvidedData),
  }),
};
