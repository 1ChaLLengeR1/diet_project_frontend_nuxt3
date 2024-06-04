// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["./public/main.css"],
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
});
