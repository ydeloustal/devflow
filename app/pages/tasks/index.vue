<script setup lang="ts">
import type { TaskPriority, TaskStatus } from '~/types/devflow'

const { tasks, totalTasks, completedTasks, pendingTasks, urgentTasks, completionRate, totalEstimatedHours } = useTasks()
const { searchQuery, selectedStatus, selectedPriority, selectedAssigneeId, filteredTasks, resetFilters } = useTaskFilters(tasks)

useSeoMeta({ title: 'Tâches | DevFlow', description: 'Pilotez les tâches et le sprint de l’agence DevSquad.' })

const statusLabels: Record<TaskStatus, string> = { todo: 'À faire', in_progress: 'En cours', in_review: 'En revue', done: 'Terminé' }
const priorityLabels: Record<TaskPriority, string> = { low: 'Basse', medium: 'Moyenne', high: 'Haute', urgent: 'Urgente' }
const assignees = computed(() => [...new Map(tasks.value.filter((task) => task.assignee).map((task) => [task.assignee!.id, task.assignee!])).values()])
const hasFilters = computed(() => Boolean(searchQuery.value || selectedStatus.value !== 'all' || selectedPriority.value !== 'all' || selectedAssigneeId.value !== 'all'))
const formatDate = (date: string) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' }).format(new Date(date))
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div><p class="kicker">Mardi 15 septembre 2026 / sprint 08</p><h1>Bonjour, DevSquad<span>.</span></h1><p class="subtitle">Voici l’état d’avancement de vos projets.</p></div>
      <NuxtLink class="profile" to="/team"><UserAvatar :user="{ name: 'DevSquad' }" size="sm" /><span>Mon équipe</span></NuxtLink>
    </header>
    <section class="metrics" aria-label="Métriques du sprint">
      <article><h3 class="metric-label">Tâches totales</h3><strong>{{ totalTasks }}</strong><small>dans le sprint</small></article>
      <article><h3 class="metric-label">En attente</h3><strong>{{ pendingTasks }}</strong><small>à traiter</small></article>
      <article class="metric-alert"><h3 class="metric-label">Priorité urgente</h3><strong>{{ urgentTasks }}</strong><small>à surveiller</small></article>
      <article><h3 class="metric-label">Progression</h3><strong>{{ completionRate }}%</strong><small>{{ totalEstimatedHours }}h estimées</small></article>
    </section>
    <section class="work-area">
      <div class="section-heading"><div><p class="kicker">Vue opérationnelle</p><h2>Les tâches du sprint</h2></div><span class="count">{{ completedTasks }}/{{ totalTasks }} terminées</span></div>
      <div class="filters">
        <label class="search"><span>⌕</span><input v-model="searchQuery" type="search" placeholder="Rechercher une tâche..."></label>
        <select v-model="selectedStatus" aria-label="Filtrer par statut"><option value="all">Tous les statuts</option><option v-for="(label, value) in statusLabels" :key="value" :value="value">{{ label }}</option></select>
        <select v-model="selectedPriority" aria-label="Filtrer par priorité"><option value="all">Toutes les priorités</option><option v-for="(label, value) in priorityLabels" :key="value" :value="value">{{ label }}</option></select>
        <select v-model="selectedAssigneeId" aria-label="Filtrer par membre"><option value="all">Toute l’équipe</option><option v-for="assignee in assignees" :key="assignee.id" :value="assignee.id">{{ assignee.name }}</option></select>
        <button v-if="hasFilters" class="clear" type="button" @click="resetFilters">Réinitialiser</button>
      </div>
      <div v-if="filteredTasks.length" class="task-list">
        <NuxtLink v-for="task in filteredTasks" :key="task.id" class="task-row" :to="`/tasks/${task.id}`">
          <span class="status-dot" :class="`status-${task.status}`"></span>
          <span class="task-main"><strong>{{ task.title }}</strong><small>{{ task.tags.join(' · ') }} · {{ formatDate(task.createdAt) }}</small></span>
          <span class="priority" :class="`priority-${task.priority}`">{{ priorityLabels[task.priority] }}</span>
          <UserAvatar :user="task.assignee" size="sm" /><span class="arrow">→</span>
        </NuxtLink>
      </div>
      <div v-else class="empty"><strong>Aucune tâche trouvée</strong><span>Modifiez vos filtres pour élargir la recherche.</span></div>
    </section>
  </div>
</template>

<style scoped>
.page { margin: 0 auto; max-width: 1180px; padding: 55px 6%; }
.page-header, .section-heading { align-items: flex-end; display: flex; justify-content: space-between; }
.kicker { color: #4c9d50; font-size: .72rem; font-weight: 800; letter-spacing: .1em; margin: 0 0 10px; text-transform: uppercase; }
h1 { font-size: clamp(2.2rem, 5vw, 4rem); letter-spacing: -.05em; margin: 0; }
h1 span { color: #4c9d50; }
.subtitle { color: #718078; margin: 10px 0 0; }
.profile { align-items: center; color: #17352b; display: flex; font-size: .85rem; font-weight: 700; gap: 8px; text-decoration: none; }
.metrics { display: flex; gap: 14px; margin: 52px 0 62px; flex-wrap: wrap; }
.metrics article { background: #fff; border: 1px solid #e3eae4; border-radius: 9px; padding: 20px; flex: 1; text-align: center; min-width: 160px; }
.metric-label { color: #17352b; display: block; font-size: .90rem; }
.metrics small { color: #718078; display: block; font-size: .78rem; }
.metrics strong { display: block; font-size: 2.2rem; letter-spacing: -.04em; margin: 12px 0 3px; }
.metric-alert strong { color: #d05a42; }
h2 { font-size: 1.6rem; margin: 0; }
.count { color: #718078; font-size: .85rem; }
.filters { display: flex; flex-wrap: wrap; gap: 9px; margin: 20px 0 16px; }
.search { align-items: center; background: #fff; border: 1px solid #e0e7e1; border-radius: 6px; display: flex; flex: 1 1 220px; gap: 8px; padding: 0 12px; }
.search span { color: #718078; font-size: 1.3rem; }
input, select { background: transparent; border: 0; font: inherit; min-width: 0; outline: 0; padding: 11px 0; width: 100%; }
select { background: #fff; border: 1px solid #e0e7e1; border-radius: 6px; color: #45574b; padding: 11px; width: auto; }
.clear { background: none; border: 0; color: #4c9d50; cursor: pointer; font: inherit; font-size: .8rem; font-weight: 700; padding: 0 8px; }
.task-list { border-top: 1px solid #dfe7e1; }
.task-row { align-items: center; border-bottom: 1px solid #dfe7e1; color: #17211b; display: flex; gap: 16px; padding: 18px 8px; text-decoration: none; }
.task-row:hover { background: #eff5ed; }
.status-dot { border: 3px solid #aebeb2; border-radius: 50%; height: 12px; width: 12px; }
.status-in_progress { border-color: #e7a936; }.status-in_review { border-color: #6995d7; }.status-done { background: #4c9d50; border-color: #4c9d50; }
.task-main { display: grid; flex: 1; gap: 5px; min-width: 0; }.task-main strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }.task-main small { color: #829087; font-size: .78rem; }
.priority { border-radius: 4px; font-size: .7rem; font-weight: 800; padding: 5px 8px; }.priority-urgent { background: #fbe4df; color: #b4432f; }.priority-high { background: #fff0d4; color: #9b680d; }.priority-medium { background: #e3eefb; color: #3c6da5; }.priority-low { background: #e7f2e7; color: #3f8041; }
.arrow { color: #8b9b90; font-size: 1.2rem; }.empty { border: 1px dashed #cbd8cd; display: grid; gap: 8px; padding: 48px; text-align: center; }.empty span { color: #718078; font-size: .9rem; }
@media (max-width: 800px) { .metrics { grid-template-columns: repeat(2, 1fr); margin: 35px 0; } .page-header { align-items: flex-start; flex-direction: column; gap: 25px; } .task-row { gap: 9px; } .priority { display: none; } }
</style>