// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    "@/assets/css/main.css"
  ],
  modules: ['@pinia/nuxt', "@nuxthub/core"],
  hub: {
    database: true
  },
  $development: {
    hub: {
      remote: true
    }
  },
  runtimeConfig: {
    public: {
      url: ''
    }
  }
})