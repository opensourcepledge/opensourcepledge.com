import react from '@astrojs/react';
import sanity from '@sanity/astro';
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://opensourcepledge.com",

  redirects: {
    'opensourcepledge.pdf': 'open-source-pledge-one-pager.pdf',
    'osspledge.pdf': 'open-source-pledge-one-pager.pdf',
  },

  integrations: [
    sanity({
      projectId: '4jfayhvz',
      dataset: 'production',
      useCdn: false, // Because we're building statically
      studioBasePath: '/studio',
    }),
    react()
  ],
});