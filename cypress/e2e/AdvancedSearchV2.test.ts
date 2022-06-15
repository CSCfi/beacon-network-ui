describe("Advanced search V2", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.get("#v2Switch").click();
    cy.get('[data-testid="advanced"]').click();
    cy.contains("v2 search");
  });
  it("can do a example search", () => {
    cy.get('[data-testid="exampleButton"]').click();
    cy.get('[data-testid="searchTest"]').click();
    cy.contains("European Genome-Phenome Archive (EGA)");
    cy.contains("Display 1 result(s)");
  });
  it("can do an invalid search", () => {
    cy.visit("/");
    cy.get("#v2Switch").click();
    cy.get('[data-testid="advanced"]').click();
    cy.get('[data-testid="exampleButton"]').click();

    cy.get('[data-testid="minStart"]').clear();
    cy.get('[data-testid="maxStart"]').clear();
    cy.get('[data-testid="minEnd"]').clear();
    cy.get('[data-testid="maxEnd"]').clear();

    cy.get('[data-testid="minStart"]').type("180");
    cy.get('[data-testid="maxStart"]').type("190");
    cy.get('[data-testid="minEnd"]').type("190");
    cy.get('[data-testid="maxEnd"]').type("200");

    cy.get('[data-testid="searchTest"]').click();
    cy.contains("No results found.");
  });
});
