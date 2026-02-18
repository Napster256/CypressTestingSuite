import task from "./helpers/toDoListTasks.json";

describe("Функциональное тестирование списка задач (Cypress)", () => {
  beforeEach(() => {
    cy.visit("https://todomvc.com/examples/emberjs/todomvc/dist/");
    cy.contains("todos");
  });

 it("Добавление одной задачи", () => {
    cy.get("input.new-todo").type("Стать Миллиардером{enter}");
    cy.contains(".todo-list li", "Стать Миллиардером");
  });

  task.forEach((task) => {
    it(`Добавление задачи: ${task}`, () => {
      cy.get("input.new-todo").type(`${task}{enter}`);
      cy.contains(".todo-list li", task);
    });
  });

  afterEach(() => {
    cy.get("input.toggle").click();
    cy.get("button.clear-completed").click();
  });
});