import "cypress-localstorage-commands";

describe("Basic Search version 2", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.get('[data-testid="beaconListing"]').click();
    cy.contains("V2 listings search");
  });
  it("can do a example search", () => {
    cy.get('[data-testid="exampleButton"]').click();
    cy.get('[data-testid="searchTest"]').click();
    cy.contains("European Genome-Phenome Archive (EGA)");
    cy.contains("Display 1 result(s)");
    cy.saveLocalStorage();
  });
  it("generates search history", () => {
    cy.restoreLocalStorage();
    cy.get(".navbar-burger").click();
    cy.get('[data-testid="historyButton"]').click();
    cy.contains(
      "results?searchInInput=biosamples&id=SAMN03283350&searchByInput=individuals"
    );
  });
});
