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
      login: '/en/login',
      callback: '/en/confirmation',
      include: undefined,
      exclude: [
        '/en/lettercode', '/fr/lettercode', '/nl/lettercode',
        '/en/login', '/fr/login', '/nl/login', 
        '/en/confirmation','/fr/confirmation','/nl/confirmation',
      ],
      cookieRedirect: false,
    }
  },
  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default
    strategy: 'prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English',}, 
      { code: 'fr', name: 'French'}, 
      { code: 'nl', name: 'Dutch'}],
    detectBrowserLanguage: false
  },
  runtimeConfig: {
    public: {
      url: ''
    }
  }
})