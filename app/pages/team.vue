<script setup lang="ts">
import type { User } from '~/types/devflow'

useSeoMeta({ title: 'Équipe | DevFlow', description: 'Découvrez l’équipe de l’agence DevSquad.' })

const team: User[] = [
  { id: 'u1', name: 'Camille Martin', email: 'camille@devsquad.fr', role: 'lead' },
  { id: 'u2', name: 'Nora Bernard', email: 'nora@devsquad.fr', role: 'frontend' },
  { id: 'u3', name: 'Yanis Petit', email: 'yanis@devsquad.fr', role: 'backend' },
  { id: 'u4', name: 'Inès Roy', email: 'ines@devsquad.fr', role: 'qa' }
]

const roleLabels: Record<User['role'], string> = { lead: 'Lead projet', frontend: 'Frontend', backend: 'Backend', qa: 'Qualité' }
</script>

<template>
  <div class="page">
    <header class="page-header"><div><p class="kicker">DevSquad / collectif</p><h1>L’équipe</h1><p class="subtitle">Les personnes qui font avancer chaque livraison.</p></div><NuxtLink class="back" to="/tasks">← Vue tâches</NuxtLink></header>
    <section class="team-grid">
      <article v-for="member in team" :key="member.id" class="member">
        <UserAvatar :user="member" size="lg" />
        <h2>{{ member.name }}</h2>
        <p class="role">{{ roleLabels[member.role] }}</p>
        <a :href="`mailto:${member.email}`">{{ member.email }}</a>
      </article>
    </section>
  </div>
</template>

<style scoped>
.page { margin: 0 auto; max-width: 1120px; padding: 58px 6%; }
.page-header { align-items: flex-end; display: flex; justify-content: space-between; margin-bottom: 42px; }
.kicker { color: #4c9d50; font-size: .72rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
h1 { font-size: clamp(2rem, 5vw, 3.7rem); letter-spacing: -.04em; margin: 8px 0; }
.subtitle { color: #68786e; margin: 0; }
.back { color: #17352b; font-weight: 700; text-decoration: none; }
.team-grid { display: grid; gap: 16px; grid-template-columns: repeat(4, 1fr); }
.member { background: #fff; border: 1px solid #e2e9e2; border-radius: 10px; padding: 24px; }
.member h2 { font-size: 1.1rem; margin: 24px 0 5px; }
.role { color: #4c9d50; font-size: .85rem; font-weight: 700; margin: 0 0 18px; }
.member a { color: #75837a; font-size: .8rem; text-decoration: none; }
@media (max-width: 800px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 500px) { .page-header { align-items: flex-start; flex-direction: column; gap: 20px; } .team-grid { grid-template-columns: 1fr; } }
</style>