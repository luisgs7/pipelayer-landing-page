<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  name: string;
  class?: string;
}>();

/** Ligatures Material (snake_case) → chaves Iconify `material-symbols` (kebab); exceções raras. */
const OVERRIDES: Record<string, string> = {
  cloud_queue: "cloud-outline",
  file_download: "download",
};

const iconifyName = computed(() => {
  const suffix = OVERRIDES[props.name] ?? props.name.replace(/_/g, "-");
  return `material-symbols:${suffix}`;
});
</script>

<template>
  <Icon :name="iconifyName" mode="svg" :class="props.class" />
</template>
