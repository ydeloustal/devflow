<script setup lang="ts">
declare const definePageMeta: (meta: { layout: string }) => void

definePageMeta({ layout: 'auth' })
useSeoMeta({ title: 'Connexion | DevFlow', description: 'Connectez-vous à votre espace DevSquad.' })

const email = ref('')
const password = ref('')
const submitted = ref(false)

const submit = () => {
  submitted.value = true
}
</script>

<template>
  <section class="login-panel">
    <div class="logo">D</div>
    <p class="kicker">DevSquad workspace</p>
    <h1>Bon retour.</h1>
    <p class="intro">Retrouvez votre équipe et gardez le rythme du sprint.</p>
    <form @submit.prevent="submit">
      <label for="email">Email professionnel</label>
      <input id="email" v-model="email" type="email" required placeholder="vous@devsquad.fr">
      <label for="password">Mot de passe</label>
      <input id="password" v-model="password" type="password" required placeholder="••••••••">
      <button type="submit">Se connecter <span>→</span></button>
    </form>
    <p v-if="submitted" class="notice">Connexion prête pour l’intégration de votre fournisseur d’identité.</p>
  </section>
</template>

<style scoped>
.login-panel { background: #f7f8f5; border-radius: 14px; color: #17352b; max-width: 420px; padding: 42px; width: 100%; }
.logo { align-items: center; background: #b8ef72; border-radius: 9px; color: #17352b; display: flex; font-size: 1.3rem; font-weight: 900; height: 38px; justify-content: center; width: 38px; }
.kicker { color: #4c9d50; font-size: .72rem; font-weight: 800; letter-spacing: .1em; margin: 34px 0 8px; text-transform: uppercase; }
h1 { font-size: 2.5rem; margin: 0; }
.intro { color: #66776c; margin: 10px 0 30px; }
form { display: grid; gap: 9px; }
label { font-size: .8rem; font-weight: 700; margin-top: 8px; }
input { border: 1px solid #d7dfd8; border-radius: 6px; font: inherit; padding: 12px; }
button { background: #17352b; border: 0; border-radius: 6px; color: #fff; cursor: pointer; font: inherit; font-weight: 700; margin-top: 18px; padding: 13px; }
button span { float: right; font-size: 1.2rem; }
.notice { color: #4c9d50; font-size: .8rem; }
</style>