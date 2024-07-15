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
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (["chrome", "edge"].includes(browser.name)) {
          if (browser.isHeadless) {
            launchOptions.args.push("--no-sandbox");
            launchOptions.args.push("--disable-gl-drawing-for-tests");
            launchOptions.args.push("--disable-gpu");
          }
          launchOptions.args.push("--js-flags=--max-old-space-size=3500");
        }
        return launchOptions;
      });
    },
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
    DIET_AUTH0_ENDPOINT: "",

    AUTH0_EMAIL: "",
    AUTH0_PASSWORD: "",
    LINK: "http://localhost:3001",

    browserPermissions: {
      notifications: "allow",
      geolocation: "allow",
    },
  },
});
