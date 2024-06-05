import { createAuth0 } from "@auth0/auth0-vue";

export default defineNuxtPlugin((nuxtApp) => {
  const env = useRuntimeConfig();
  const auth0 = createAuth0({
    domain: env.public.domainAuth0,
    clientId: env.public.clientIdAuth0,
    authorizationParams: {
      redirect_uri: env.public.redirectUri,
    },
  });

  if (process.client) {
    nuxtApp.vueApp.use(auth0);
  }
});
