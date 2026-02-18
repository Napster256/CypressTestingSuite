import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://pokemonbattle.ru/login',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    setupNodeEvents(on, config) {
      // Настройка событий node
    },
  },
  env: {
    login: "autotest@mail.com",
    password: "Autotest!1",
  },
  viewportWidth: 1728,
  viewportHeight: 918,
});
