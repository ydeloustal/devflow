export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: true },
  typescript: { strict: true, typeCheck: true },
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'DevFlow',
      meta: [
        { name: 'description', content: 'Suivez les tâches et la progression de votre agence DevSquad.' }
      ]
    }
  }
})