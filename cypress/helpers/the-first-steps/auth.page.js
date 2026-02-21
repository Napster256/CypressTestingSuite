import {locators} from './locators.js'
import {BasePage} from './base.page.js'
export class AuthPage extends BasePage {
  /**
   * конструктор инициализации свойства авторизации
   */
  constructor() {
    super();

    this.Auth = locators.authorization;
  }
  /**
   * метод получения кнопки авторизации
   */
  get loginButton() {
    return cy.get(this.Auth.loginButton);
  }
  };