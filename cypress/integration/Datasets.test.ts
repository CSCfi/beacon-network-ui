describe("Datasets page", () => {
  it("can be opened", () => {
    cy.visit("/");
    cy.get(".navbar-burger").click();
    cy.get('[data-testid="datasetsButton"]').click();
    cy.contains("Datasets");
  });
  it("can show beacons data sets", () => {
    cy.get('[data-testid="beaconButton"]')
      .contains("Development Beacon")
      .click();
    cy.contains("urn:hg:1000genome");
  });
  it("can close datasets", () => {
    cy.get('[data-testid="closeButton"]').click();
    cy.contains("urn:hg:1000genome").should("not.exist");
  });
  it("can do a faulty search", () => {
    cy.get('[data-testid="searchBar"]').type("testing");
    cy.get('[data-testid="searchButton"]').click();
    cy.contains("urn:hg:1000genome").should("not.exist");
  });
  it("can do a search", () => {
    cy.get('[data-testid="searchBar"]').clear();
    cy.get('[data-testid="searchBar"]').type("urn");
    cy.get('[data-testid="searchButton"]').click();
    cy.contains("urn:hg:1000genome");
  });
  it("can return to main page", () => {
    cy.get(".navbar-burger").click();
    cy.get('[data-testid="returnToHomeTab"]').click();
    cy.contains("Advanced Search");
  });
});
