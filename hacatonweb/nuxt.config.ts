export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
  ],

  css: [
    'leaflet/dist/leaflet.css',
  ],

    build: {
      transpile: ['@vue-leaflet/vue-leaflet'],
    },
  })