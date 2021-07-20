describe("Advanced search", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.get('[data-testid="advanced"]').click();
    cy.contains("Assembly");
  });
  it("can do a example search", () => {
    cy.get('[data-testid="exampleButton"]').click();
    cy.get('[data-testid="searchTest"]').click();
    cy.contains("Development Beacon");
    cy.contains("Display 6 result(s)");
  });
  it("can show unknown beacons", () => {
    // expects aggregator to be in registry
    cy.get('[data-testid="unknownButton"]').click();
    cy.contains("GA4GHBeacon at CSC");
  });
  it("can do an invalid search", () => {
    cy.visit("/");
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
