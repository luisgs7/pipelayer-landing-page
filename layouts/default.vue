<script setup lang="ts">
import interLatinExtWoff2 from "@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2?url";
import interLatinWoff2 from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";

const route = useRoute();
const site = useSiteConfig();
const canonicalHref = withSiteUrl(computed(() => route.path));

useSeoMeta({
  description: () => site.description,
  ogTitle: "Pipeline.dev | Stripe to Google Sheets",
  ogDescription: () => site.description,
  ogUrl: canonicalHref,
});

useHead({
  htmlAttrs: { class: "dark", lang: "en" },
  title: "Pipeline.dev | Stripe to Google Sheets",
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1.0" }],
  link: [
    {
      rel: "preload",
      href: interLatinWoff2,
      as: "font",
      type: "font/woff2",
      crossorigin: "anonymous",
      fetchpriority: "high",
    },
    {
      rel: "preload",
      href: interLatinExtWoff2,
      as: "font",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "canonical", href: canonicalHref },
  ],
});
</script>

<template>
  <slot />
</template>
