<script setup lang="ts">
import type { Task, TaskStatus } from '~/types/devflow'
import type { DeepReadonly } from 'vue'

defineProps<{
  task: DeepReadonly<Task>
  priorityLabel: string
  statusLabels: Record<TaskStatus, string>
}>()

const emit = defineEmits<{
  'status-change': [status: TaskStatus]
  delete: []
}>()

const formatDate = (date: string) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' }).format(new Date(date))
const changeStatus = (event: Event) => emit('status-change', (event.target as HTMLSelectElement).value as TaskStatus)
</script>

<template>
  <article class="task-card" :class="`task-card--${task.status}`">
    <div class="task-card__topline">
      <span class="status-dot" :class="`status-${task.status}`" aria-hidden="true"></span>
      <PriorityBadge :priority="task.priority" :label="priorityLabel" />
    </div>
    <NuxtLink class="task-card__title" :to="`/tasks/${task.id}`">{{ task.title }}</NuxtLink>
    <p class="task-card__description">{{ task.description }}</p>
    <small class="task-card__meta">{{ task.tags.join(' · ') }} · {{ formatDate(task.createdAt) }}</small>
    <div class="task-card__footer">
      <TaskAssignee :user="task.assignee" />
      <label class="status-control">
        <span class="sr-only">Statut de {{ task.title }}</span>
        <select :value="task.status" :aria-label="`Changer le statut de ${task.title}`" @change="changeStatus">
          <option v-for="(label, value) in statusLabels" :key="value" :value="value">{{ label }}</option>
        </select>
      </label>
      <slot name="actions" :task="task">
        <button class="delete-action" type="button" :aria-label="`Supprimer ${task.title}`" @click="emit('delete')">×</button>
      </slot>
    </div>
  </article>
</template>

<style scoped>
.task-card { background: #fff; border: 1px solid #dfe7e1; border-radius: 8px; display: grid; gap: 13px; min-width: 0; padding: 18px; transition: border-color .2s, transform .2s; }
.task-card:hover { border-color: #9dbba1; transform: translateY(-2px); }
.task-card__topline, .task-card__footer { align-items: center; display: flex; gap: 10px; justify-content: space-between; }
.task-card__topline { justify-content: flex-start; }
.task-card__title { color: #17211b; font-size: 1.05rem; font-weight: 800; text-decoration: none; }
.task-card__title:hover { color: #4c9d50; }
.task-card__description { color: #718078; font-size: .85rem; line-height: 1.5; margin: 0; }
.task-card__meta { color: #829087; font-size: .72rem; }
.status-dot { border: 3px solid #aebeb2; border-radius: 50%; flex: 0 0 auto; height: 12px; width: 12px; }
.status-in_progress { border-color: #e7a936; }.status-in_review { border-color: #6995d7; }.status-done { background: #4c9d50; border-color: #4c9d50; }
.status-control select { background: #f7f8f5; border: 1px solid #d8e2d9; border-radius: 5px; color: #45574b; font: inherit; font-size: .72rem; max-width: 112px; padding: 7px 8px; }
.delete-action { background: none; border: 0; color: #b4432f; cursor: pointer; font-size: 1.25rem; line-height: 1; padding: 4px; }
.sr-only { height: 1px; margin: -1px; overflow: hidden; position: absolute; width: 1px; clip: rect(0, 0, 0, 0); }
@media (max-width: 500px) { .task-card__footer { align-items: flex-start; flex-wrap: wrap; }.status-control { margin-left: auto; } }
</style>