<script setup lang="ts">
const route = useRoute()

const navigation = [
  { label: 'Tâches', to: '/tasks', icon: '✓' },
  { label: 'Équipe', to: '/team', icon: '◎' }
]
</script>

<template>
  <div class="shell">
    <aside class="sidebar">
      <NuxtLink class="brand" to="/tasks"><span class="brand-mark">D</span><span>DevFlow</span></NuxtLink>
      <p class="eyebrow">DevSquad / espace projet</p>
      <nav class="nav" aria-label="Navigation principale">
        <NuxtLink v-for="item in navigation" :key="item.to" class="nav-link" :class="{ active: route.path.startsWith(item.to) }" :to="item.to">
          <span>{{ item.icon }}</span>{{ item.label }}
        </NuxtLink>
      </nav>
      <div class="sidebar-footer">Sprint 08 <span>●</span></div>
    </aside>
    <main class="content"><slot /></main>
  </div>
</template>

<style scoped>
.shell { background: #f7f8f5; color: #17211b; display: flex; min-height: 100vh; }
.sidebar { background: #17352b; color: #d9e8df; display: flex; flex-direction: column; padding: 28px 20px; width: 250px; }
.brand { align-items: center; color: #fff; display: flex; font-size: 1.2rem; font-weight: 800; gap: 10px; text-decoration: none; }
.brand-mark { align-items: center; background: #b8ef72; border-radius: 9px; color: #17352b; display: flex; height: 32px; justify-content: center; width: 32px; }
.eyebrow { color: #8fac9e; font-size: .7rem; letter-spacing: .08em; margin: 50px 10px 14px; text-transform: uppercase; }
.nav { display: grid; gap: 8px; }
.nav-link { align-items: center; border-radius: 8px; color: #b9cec2; display: flex; font-size: .95rem; gap: 12px; padding: 12px; text-decoration: none; }
.nav-link span { font-size: 1.15rem; width: 18px; }
.nav-link:hover, .nav-link.active { background: #2b5242; color: #fff; }
.sidebar-footer { border-top: 1px solid #315748; color: #9bb4a5; font-size: .8rem; margin-top: auto; padding: 20px 10px 0; }
.sidebar-footer span { color: #b8ef72; float: right; }
.content { flex: 1; min-width: 0; }
@media (max-width: 700px) { .shell { display: block; } .sidebar { padding: 18px; width: auto; } .eyebrow, .sidebar-footer { display: none; } .nav { display: flex; margin-top: 20px; } .nav-link { flex: 1; justify-content: center; } }
</style>