<script setup lang="ts">
useHead({
  htmlAttrs: { class: "dark", lang: "en" },
  title: "Pipeline.dev | Stripe to Google Sheets",
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1.0" }],
  link: [
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
    },
  ],
});
</script>

<template>
  <slot />
</template>
