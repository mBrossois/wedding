// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    "@/assets/css/main.css"
  ],
  modules: ['@pinia/nuxt', "@nuxtjs/supabase", '@nuxtjs/i18n'],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirmation',
      include: undefined,
      exclude: ['/lettercode', '/login', '/confirmation'],
      cookieRedirect: false,
    }
  },
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  },
  runtimeConfig: {
    public: {
      url: ''
    }
  }
})