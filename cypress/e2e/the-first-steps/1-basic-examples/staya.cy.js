
describe('Тестирование staya', function () {

    it.only('Проваливаюсь в категорию поводки и ищу совпадение с названием Heatwave', function () {
        cy.visit('https://staya.dog/');
        cy.contains('span', 'Поводки').click();
        cy.contains('Leopard');
        cy.end();
         })
})
