const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    apiUrl: "http://localhost:3000/todos",
  },
  e2e: {
    experimentalStudio: true,
    specPattern: "cypress/tests/**/*.spec.{js,jsx,ts,tsx}",
    // setupNodeEvents(on, config) {
    // }
  }
});
