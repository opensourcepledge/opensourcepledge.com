import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://osspledge.com",
  integrations: [tailwind(), sentry()],
});
