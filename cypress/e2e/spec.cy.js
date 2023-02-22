describe('Todo List', () => {
  beforeEach(() => {
    cy.visit("index.html");
    cy.request(Cypress.env("apiUrl")).as("todos");
  });

  it('shows the Todo List', () => {
    cy.get("@todos").should((response) => {
      expect(response.body).to.have.length(2)
    })

    cy.get(".todo-list > li")
      .should("have.length", 2)
      .eq(0)
      .should("contain", "Feed the cat");
  });
})
