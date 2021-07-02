describe("Datasets page", () => {
  it("can be opened", () => {
    cy.visit("/");
    cy.get('[data-testid="datasetsButton"]').click();
    cy.contains("Datasets");
  });
  it("can show beacons data sets", () => {
    cy.get('[data-testid="beaconButton"]').click();
    cy.contains("urn:hg:1000genome");
  });
  it("can return to main page", () => {
    cy.get('[data-testid="returnToHomeTab"]').click();
    cy.contains("Advanced Search");
  });
});
