import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://pokemonbattle.ru/login",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    /**
     * Позволяет взаимодействовать с процессом Node.js.
     * Используется для регистрации задач (tasks), перехвата событий браузера
     * и динамического изменения переменных окружения.
     * @param {function} on - функция, которая будет вызываться при каждом событии node процесса
     * @param {object} config - Cypress конфигурация
     */
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    login: "autotest@mail.com",
    password: "Autotest!1",
  },
  viewportWidth: 1728,
  viewportHeight: 918,
});
