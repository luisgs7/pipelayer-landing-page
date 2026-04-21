<script setup lang="ts">
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
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "canonical", href: canonicalHref },
  ],
});
</script>

<template>
  <slot />
</template>
