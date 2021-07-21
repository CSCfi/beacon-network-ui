describe("Error page", () => {
  it("can be opened", () => {
    cy.visit("/wrongUrl");
    cy.contains("(404) Page NotFound");
  });
  it("can return to homepage", () => {
    cy.get('[data-testid="homeButton"]').click();
    cy.contains("Advanced Search");
  });
});
