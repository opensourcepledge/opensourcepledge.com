import { defineConfig } from "astro/config";


// https://astro.build/config
export default defineConfig({
  site: "https://opensourcepledge.com",
  redirects: {
    'opensourcepledge.pdf': 'open-source-pledge-one-pager.pdf',
    'osspledge.pdf': 'open-source-pledge-one-pager.pdf',
  },
});