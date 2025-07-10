// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-10',

  devServer: {
    port: 5000
  },

  devtools: {
    enabled: true
  },

  typescript: {
    typeCheck: true
  }
})
