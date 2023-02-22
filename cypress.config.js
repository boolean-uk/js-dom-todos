const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    apiUrl: "http://localhost:3000/todos",
  },
  e2e: {
    experimentalStudio: true,
    // setupNodeEvents(on, config) {
    // }
  }
});
