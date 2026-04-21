import tailwindcss from "@tailwindcss/vite";

const siteDescription =
  "Sync Stripe data to Google Sheets in minutes. Serverless, no-code Stripe exports for finance and growth teams. Join the Shopify waitlist.";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-04-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@nuxtjs/seo", "@nuxt/icon"],
  icon: {
    mode: "svg",
    provider: "server",
  },

  // nuxt-site-config: absolute canonical + defaults for @nuxtjs/seo
  site: {
    url:
      process.env.NUXT_SITE_URL ||
      process.env.RENDER_EXTERNAL_URL ||
      "http://localhost:3000",
    name: "Pipeline.dev",
    description: siteDescription,
  },
});