/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "app-dark": "#181225",
        "app-muted": "#ccc",
        "app-purple": "#9E86FF",
        "app-pink": "#FF70BC",
        "app-yellow": "#FFD00E",
        "app-green": "#C0ED49",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
