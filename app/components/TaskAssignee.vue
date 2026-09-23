<script setup lang="ts">
import type { User } from '~/types/devflow'
import type { DeepReadonly } from 'vue'

defineProps<{
  user: DeepReadonly<User> | null
}>()
</script>

<template>
  <span class="assignee" :title="user?.name ?? 'Non assignée'">
    <UserAvatar :user="user" size="sm" />
    <span class="assignee-name">{{ user?.name ?? 'Non assignée' }}</span>
  </span>
</template>

<style scoped>
.assignee { align-items: center; display: inline-flex; gap: 8px; min-width: 0; }
.assignee-name { color: #718078; font-size: .78rem; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>