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

  devServer: {
    port: 4000,
  },

  server: {
    port: 4000,
  },

  apps: [
    {
      name: "ProjectDiet",
      port: "4000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],

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
