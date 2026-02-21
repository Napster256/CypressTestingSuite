import { AuthPage } from '../../../helpers/the-first-steps/auth.page';

describe('Проверка авторизации', () => {
  const authPage = new AuthPage();

  beforeEach(() => {
    cy.intercept("POST","https://api.pokemonbattle.ru/v2/technical_routes/auth_control").as("authControl")
    cy.visit('/')
  })

  it('функциональный тест с корректными данными', () => {
    // тест упадает из-за устаревших данных
    // cy.intercept("GET", "URL").as("AliasedRoute")
    authPage.fillingField(Cypress.env("login"))
    authPage.fillingField(Cypress.env("password"), 1)
    authPage.clickEvent('loginButton');
    // cy.wait("@AliasedRoute");
  });

  // Параметризатор тестов
  [
    ["не функциональный тест с пустыми полями", '{backspace}', '{backspace}', [
      [0, "Введите почту"],
      [1, "Введите пароль"],
    ]],
    ["не функциональный тест с некорректной почтой", "Autotest", Cypress.env("password"),
      [[
       0, "Введите почту"
      ]]
    ],
    ["не функциональный тест с некорректным паролем", Cypress.env("login"), "Autotest", [
      [
        1, "Неверные логин или пароль"
      ]
    ]],
  ].forEach((testItem) => {
    it(testItem[0], () => {
      authPage.fillingField(testItem[1])
      authPage.fillingField(testItem[2], 1)
      authPage.clickEvent('loginButton')

      if (testItem[0].includes("не функциональный тест с некорректным паролем")) {
        cy.wait("@authControl").its('response.statusCode').should('eq', 400)
      }

      testItem[3].forEach((failedValues) => {
        authPage.checkFillingStatus('failedIndexes', failedValues[1], failedValues[0])
        authPage.checkCssSelectorPropertyValue("failedIndexes", "color", authPage.base.failedColor, failedValues[0])
      })
    });
  })

})