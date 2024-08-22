// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiServer: process.env.API_SERVER,
      domainAuth0: process.env.DOMAIN_AUTH0,
      clientIdAuth0: process.env.CLIENT_ID_AUTH0,
      redirectUri: process.env.REDIRECT_URL,
      audience: process.env.AUDIENCE,
      auth0Email: process.env.AUTH0_EMAIL,
      auth0Password: process.env.AUTH0_PASSWORD,
    },
  },

  devtools: { enabled: true },

  generate: {
    fallback: true,
  },

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

  modules: ["@nuxtjs/i18n", "@pinia/nuxt", "@vueform/nuxt"],

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

  compatibilityDate: "2024-07-14",
});
