<script setup lang="ts">
import type { User } from '~/types/devflow'

const props = withDefaults(defineProps<{
  user: Partial<User> | null
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md'
})

const initials = computed(() => {
  if (!props.user) {
    return '?'
  }

  const name = props.user.name?.trim() ?? ''
  if (!name) {
    return '?'
  }

  return name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
})
</script>

<template>
  <span class="avatar" :class="`avatar--${props.size}`">
    <img v-if="props.user?.avatar" :src="props.user.avatar" :alt="props.user.name ?? 'Utilisateur'">
    <span v-else>{{ initials }}</span>
  </span>
</template>

<style scoped>
.avatar { align-items: center; background: #dbeafe; border: 2px solid #fff; border-radius: 50%; color: #1d4ed8; display: inline-flex; flex: 0 0 auto; font-weight: 800; justify-content: center; overflow: hidden; }
.avatar img { height: 100%; object-fit: cover; width: 100%; }
.avatar--sm { font-size: .7rem; height: 30px; width: 30px; }
.avatar--md { font-size: .85rem; height: 40px; width: 40px; }
.avatar--lg { font-size: 1.1rem; height: 56px; width: 56px; }
</style>