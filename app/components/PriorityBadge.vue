<script setup lang="ts">
import type { TaskPriority } from '~/types/devflow'

defineProps<{
  priority: TaskPriority
  label: string
}>()
</script>

<template>
  <span class="priority" :class="`priority-${priority}`">{{ label }}</span>
</template>

<style scoped>
.priority { border-radius: 4px; font-size: .7rem; font-weight: 800; padding: 5px 8px; }
.priority-urgent { background: #fbe4df; color: #b4432f; }
.priority-high { background: #fff0d4; color: #9b680d; }
.priority-medium { background: #e3eefb; color: #3c6da5; }
.priority-low { background: #e7f2e7; color: #3f8041; }
</style>