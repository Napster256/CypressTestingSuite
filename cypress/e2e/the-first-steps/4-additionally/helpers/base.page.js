import {locators} from './locators.js'

export class BasePage {
  /**
   * конструктор инициализации базового свойства
   */
  constructor() {
    this.base = locators;
  }
  /**
   * метод получения полей
   */
  get inputFields() {
    return cy.get(this.base.inputFields);
  }
/**
 * метод получения индексов некорректно заполненных полей
 */
  get failedIndexes() {
    return cy.get(this.base.failedIndexes);
  }

  /**
   * метод заполнения поля
   * @param {string} text - текст для заполнения
   * @param {number} index - индекс поля для заполнения
   */
  fillingField(text, index = 0) {
    this.inputFields.eq(index).scrollIntoView().clear().type(text);
  }
  /**
   * метод события клика
   * @param {string} getter - гет метод элемента
   * @param {number} index - порядковый индекс элемента
   */
  clickEvent(getter, index = 0) {
    this[getter].eq(index).scrollIntoView().click();
  }

  /**
   * метод проверки заполнения поля
   * @param {string} getter - гет метод элемента
   * @param {string} text - текст для проверки
   * @param {number} index - порядковый индекс элемента
   */
  checkFillingStatus(getter, text, index = 0) {
    this[getter].eq(index).scrollIntoView().should('be.visible').and('contain', text);
  }

  /**
   * метод проверки значения css свойства
   * @param {string} getter - гет метод элемента
   * @param {string} selectorProperty - css свойство элемента
   * @param {string} value - значение css свойства элемента
   * @param {number} index - порядковый индекс элемента
   */
  checkCssSelectorPropertyValue(getter, selectorProperty, value, index = 0) {
    this[getter].eq(index).should('have.css', selectorProperty, value);
  }
}