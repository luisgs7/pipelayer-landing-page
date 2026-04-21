<script setup lang="ts">
import type { HomeCopy } from "./messages";

defineProps<{
  visible: boolean;
  copy: HomeCopy;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit"): void;
}>();
</script>

<template>
  <div v-if="visible" class="exit-overlay" @click.self="emit('close')">
    <div class="exit-modal">
      <button type="button" class="exit-close" @click="emit('close')">×</button>
      <h3 class="text-2xl font-black text-white">{{ copy.exitTitle }}</h3>
      <p class="mt-2 text-slate-300">{{ copy.exitDesc }}</p>
      <form class="mt-5 flex flex-col gap-3" @submit.prevent="emit('submit')">
        <input
          class="w-full rounded-lg border border-slate-600 bg-slate-800/80 px-4 py-3 text-white placeholder:text-slate-400 focus:border-primary focus:outline-none"
          :placeholder="copy.exitNamePlaceholder"
          type="text"
          required
        />
        <input
          class="w-full rounded-lg border border-slate-600 bg-slate-800/80 px-4 py-3 text-white placeholder:text-slate-400 focus:border-primary focus:outline-none"
          :placeholder="copy.exitEmailPlaceholder"
          type="email"
          required
        />
        <button
          type="submit"
          class="w-full rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90"
        >
          {{ copy.exitBtn }}
        </button>
      </form>
      <button
        type="button"
        class="mt-3 text-sm text-slate-400 hover:text-slate-200"
        @click="emit('close')"
      >
        {{ copy.exitDismiss }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.exit-overlay {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(2, 6, 23, 0.74);
  backdrop-filter: blur(2px);
  display: grid;
  place-items: center;
  padding: 1rem;
  animation: overlayFade 0.18s ease-out;
}

.exit-modal {
  position: relative;
  width: 100%;
  max-width: 460px;
  border-radius: 1rem;
  border: 1px solid rgba(59, 130, 246, 0.4);
  background: linear-gradient(180deg, #0f172a 0%, #111c35 100%);
  padding: 1.25rem;
  box-shadow:
    0 24px 60px rgba(2, 6, 23, 0.65),
    0 0 36px rgba(59, 130, 246, 0.2);
  animation: modalIn 0.24s ease-out;
}

.exit-close {
  position: absolute;
  right: 10px;
  top: 8px;
  border: none;
  background: transparent;
  color: #94a3b8;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
}

@keyframes overlayFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
