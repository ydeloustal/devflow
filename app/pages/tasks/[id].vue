<script setup lang="ts">
import type { TaskPriority, TaskStatus } from '~/types/devflow'

const route = useRoute()
const { getTaskById, updateTaskStatus, deleteTask } = useTasks()
const taskId = computed(() => {
  const value = route.params.id
  return Array.isArray(value) ? value[0] ?? '' : value ?? ''
})
const task = computed(() => getTaskById(taskId.value))

if (!task.value) {
  throw createError({ statusCode: 404, statusMessage: 'Cette tâche n’existe pas.' })
}

useSeoMeta({
  title: () => task.value ? `${task.value.title} | DevFlow` : 'Tâche introuvable | DevFlow',
  description: () => task.value?.description ?? 'Détail de la tâche DevFlow.'
})

const statusLabels: Record<TaskStatus, string> = { todo: 'À faire', in_progress: 'En cours', in_review: 'En revue', done: 'Terminé' }
const priorityLabels: Record<TaskPriority, string> = { low: 'Basse', medium: 'Moyenne', high: 'Haute', urgent: 'Urgente' }
const formatDate = (date: string) => new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(date))
const removeTask = async () => { deleteTask(taskId.value); await navigateTo('/tasks') }
</script>

<template>
  <div v-if="task" class="detail-page">
    <NuxtLink class="back" to="/tasks">← Retour aux tâches</NuxtLink>
    <header class="detail-header"><div><p class="kicker">Détail de la tâche</p><h1>{{ task.title }}</h1><p class="created">Créée le {{ formatDate(task.createdAt) }}</p></div><span class="priority" :class="`priority-${task.priority}`">{{ priorityLabels[task.priority] }}</span></header>
    <div class="detail-grid">
      <main class="description"><p>{{ task.description }}</p><div class="tags"><span v-for="tag in task.tags" :key="tag">{{ tag }}</span></div></main>
      <aside class="meta"><div><label>Statut</label><select :value="task.status" @change="updateTaskStatus(task.id, ($event.target as HTMLSelectElement).value as TaskStatus)"><option v-for="(label, value) in statusLabels" :key="value" :value="value">{{ label }}</option></select></div><div><label>Assignée à</label><div class="assignee"><UserAvatar :user="task.assignee" size="sm" /><span>{{ task.assignee?.name ?? 'Non assignée' }}</span></div></div><div><label>Charge estimée</label><strong>{{ task.estimatedHours }} heures</strong></div><button class="delete" type="button" @click="removeTask">Supprimer la tâche</button></aside>
    </div>
  </div>
</template>

<style scoped>
.detail-page { margin: 0 auto; max-width: 980px; padding: 58px 6%; }
.back { color: #4c9d50; font-size: .85rem; font-weight: 800; text-decoration: none; }
.detail-header { align-items: flex-start; display: flex; gap: 20px; justify-content: space-between; margin: 55px 0 40px; }
.kicker { color: #4c9d50; font-size: .72rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
h1 { font-size: clamp(2rem, 5vw, 3.6rem); letter-spacing: -.05em; margin: 10px 0; }
.created { color: #718078; font-size: .85rem; }
.priority { border-radius: 5px; font-size: .75rem; font-weight: 800; padding: 8px 10px; }
.priority-urgent { background: #fbe4df; color: #b4432f; }.priority-high { background: #fff0d4; color: #9b680d; }.priority-medium { background: #e3eefb; color: #3c6da5; }.priority-low { background: #e7f2e7; color: #3f8041; }
.detail-grid { display: grid; gap: 50px; grid-template-columns: 1.5fr 1fr; }
.description { background: #fff; border: 1px solid #e3eae4; border-radius: 9px; min-height: 240px; padding: 28px; }
.description p { font-size: 1.15rem; line-height: 1.7; margin-top: 0; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 50px; }.tags span { background: #edf4ea; border-radius: 4px; color: #4c7952; font-size: .75rem; padding: 6px 9px; }
.meta { align-content: start; display: grid; gap: 26px; }.meta > div { border-bottom: 1px solid #dfe7e1; display: grid; gap: 10px; padding-bottom: 18px; }.meta label { color: #718078; font-size: .75rem; font-weight: 800; text-transform: uppercase; }.meta select { border: 1px solid #d8e2d9; border-radius: 5px; padding: 10px; }.assignee { align-items: center; display: flex; gap: 10px; font-weight: 700; }.delete { background: none; border: 0; color: #b4432f; cursor: pointer; justify-self: start; padding: 0; }.meta strong { font-size: 1.1rem; }
@media (max-width: 700px) { .detail-header { flex-direction: column; margin-top: 35px; }.detail-grid { grid-template-columns: 1fr; gap: 28px; } }
</style>