describe('Todo List', () => {
  beforeEach(() => {
    cy.visit("index.html");
    cy.request(Cypress.env("apiUrl")).as("todos");
  });

  describe('Standard Criteria', () => {
    it('Loads and renders the Todo List from the server', () => {
      cy.get("@todos").should((response) => {
        expect(response.body).to.have.length(3)
      })

      cy.get(".todo-list > li").should("have.length", 3)

      cy.get(".todo-list > li")
        .eq(0)
        .should("contain", "Feed the cat")

      cy.get(".todo-list > li")
        .should("have.length", 3)
        .should("contain", "Cut the grass")

      cy.get(".todo-list > li")
        .eq(2)
        .should("contain", "Fix the gutters")
    });

    it('Shows completed items with grey font and is crossed-out',  () => {
      cy.get(".todo-list > li")
        .eq(0)
        .should('have.css', 'color', 'rgb(0, 0, 0)')
        .and('not.have.css', 'text-decoration', 'line-through');

      cy.get(".todo-list > li")
        .eq(1)
        .should('have.css', 'color', 'rgb(128, 128, 128)')
        .and('have.css', 'text-decoration', 'line-through solid rgb(128, 128, 128)');

      cy.get(".todo-list > li")
        .eq(2)
        .should('have.css', 'color', 'rgb(128, 128, 128)')
        .and('have.css', 'text-decoration', 'line-through solid rgb(128, 128, 128)');
    });
  });
});
