// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: [
    "@/assets/css/main.css"
  ],

  modules: [
    "@nuxtjs/supabase",
    '@pinia/nuxt',
  ],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/lettercode', '/create-account'],
      cookieRedirect: false,
    }
  
  }
})