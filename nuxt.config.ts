// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "./public/main.css",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxtjs/i18n", "@pinia/nuxt"],
  pinia: {
    autoImports: ["defineStore"],
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
  },
  vite: {
    define: {
      "process.env.DEBUG": true,
    },
  },
});
