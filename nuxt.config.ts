// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    "@/assets/css/main.css"
  ],
  modules: ['@pinia/nuxt',  "@nuxtjs/supabase"],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirmation',
      include: undefined,
      exclude: ['/lettercode', '/login', '/confirmation'],
      cookieRedirect: false,
    }
  },
  runtimeConfig: {
    public: {
      url: ''
    }
  }
})