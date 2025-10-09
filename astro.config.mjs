import sanity from '@sanity/astro';
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://opensourcepledge.com",

  redirects: {
    'images/nasdaq-2024.jpg': 'images/nasdaq-2024-10.jpg',
    'images/nasdaq-2024@1000px.jpg': 'images/nasdaq-2024-10@1000px.jpg',
    'opensourcepledge.pdf': 'open-source-pledge-one-pager.pdf',
    'osspledge.pdf': 'open-source-pledge-one-pager.pdf',
  },

  integrations: [
    sanity({
      projectId: '4jfayhvz',
      dataset: 'production',
      useCdn: false, // Because we're building statically
    }),
  ],
});