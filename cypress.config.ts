import { defineConfig } from 'cypress'

export default defineConfig({
  retries: {
    runMode: 3,
    openMode: 0,
  },
  videoCompression: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8081',
    specPattern: 'cypress/e2e/**/*.test.ts',
  },
})
