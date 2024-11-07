import { defineConfig } from "astro/config";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "https://opensourcepledge.com",
  integrations: [alpinejs()],
  redirects: {
    'opensourcepledge.pdf': 'open-source-pledge-one-pager.pdf',
    'osspledge.pdf': 'open-source-pledge-one-pager.pdf',
  },
});