import { defineConfig } from "astro/config";

import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://osspledge.com",
  integrations: [sentry()],
});
