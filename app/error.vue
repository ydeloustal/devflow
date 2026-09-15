<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number; statusMessage?: string } }>()
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <main class="error-page">
    <p class="code">{{ props.error.statusCode ?? 500 }}</p>
    <h1>{{ props.error.statusCode === 404 ? 'Page introuvable' : 'Une erreur est survenue' }}</h1>
    <p>{{ props.error.statusMessage ?? 'DevFlow ne peut pas afficher cette page.' }}</p>
    <button type="button" @click="handleError">Retourner à l’accueil</button>
  </main>
</template>

<style scoped>
.error-page { align-items: center; background: #f7f8f5; color: #17352b; display: flex; flex-direction: column; justify-content: center; min-height: 100vh; padding: 24px; text-align: center; }
.code { color: #4c9d50; font-size: 5rem; font-weight: 900; margin: 0; }
h1 { margin: 0 0 8px; }
button { background: #17352b; border: 0; border-radius: 7px; color: #fff; cursor: pointer; font: inherit; margin-top: 18px; padding: 12px 18px; }
</style>