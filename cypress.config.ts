import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "__tests__/fixtures",
  viewportHeight: 1080,
  viewportWidth: 1920,
  pageLoadTimeout: 70000,
  defaultCommandTimeout: 20_000,
  screenshotOnRunFailure: true,
  screenshotsFolder: "__tests__/report/screenshots",
  experimentalMemoryManagement: true,
  video: false,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3000",
    specPattern: [
      "__tests__/test/1.LoadInit/**/*.cy.{js,jsx,ts,tsx}",
      "__tests__/test/2.mainPages/**/*.cy.{js,jsx,ts,tsx}",
      "__tests__/test/3.profilePages/**/*.cy.{js,jsx,ts,tsx}",
      "__tests__/test/4.authectification/**/*.cy.{js,jsx,ts,tsx}",
    ],
    supportFile: "__tests__/support/e2e.ts",
    retries: {
      runMode: 2,
    },
  },
  chromeWebSecurity: false,
  env: {
    browserPermissions: {
      notifications: "allow",
      geolocation: "allow",
    },
  },
});
