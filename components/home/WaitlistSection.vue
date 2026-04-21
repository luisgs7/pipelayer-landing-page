<script setup lang="ts">
import type { HomeCopy } from "./messages";

defineProps<{
  copy: HomeCopy;
  focused?: boolean;
}>();
</script>

<template>
  <section
    id="waitlist"
    class="px-4 py-14 sm:px-6 sm:py-24"
    :class="{ 'section-focus': focused }"
  >
    <div
      class="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 p-5 text-center dark:bg-slate-800 sm:rounded-[2rem] sm:p-12"
    >
      <div
        class="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
      ></div>
      <div class="relative z-10">
        <h2 class="mb-3 text-3xl font-black text-white sm:mb-4 sm:text-4xl">
          {{ copy.waitlistTitle }}
        </h2>
        <p class="mx-auto mb-6 max-w-xl text-slate-400 sm:mb-8">
          {{ copy.waitlistDesc }}
        </p>
        <form class="mx-auto flex max-w-2xl flex-col gap-4" @submit.prevent>
          <input
            class="w-full rounded-xl border border-slate-600 bg-slate-800/70 px-4 py-4 text-white transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none"
            :placeholder="copy.namePlaceholder"
            type="text"
          />
          <input
            class="w-full rounded-xl border border-slate-600 bg-slate-800/70 px-4 py-4 text-white transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none"
            :placeholder="copy.emailPlaceholder"
            type="email"
          />
          <textarea
            class="w-full rounded-xl border border-slate-600 bg-slate-800/70 px-4 py-4 text-white transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none"
            :placeholder="copy.waitlistMessagePlaceholder"
            rows="4"
          ></textarea>
          <button
            class="w-full rounded-xl bg-primary px-6 py-3 text-base font-bold text-white transition-all hover:bg-primary/90 sm:text-xl"
            type="submit"
          >
            {{ copy.waitlistBtn }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-focus {
  animation: sectionFocusPulse 0.9s ease-out;
}

@keyframes sectionFocusPulse {
  0% {
    box-shadow: inset 0 0 0 0 rgba(59, 130, 246, 0);
  }
  35% {
    box-shadow: inset 0 0 0 2px rgba(59, 130, 246, 0.45);
  }
  100% {
    box-shadow: inset 0 0 0 0 rgba(59, 130, 246, 0);
  }
}
</style>
