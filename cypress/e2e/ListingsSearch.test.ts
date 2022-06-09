import "cypress-localstorage-commands";

describe("Listings search", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.get("#v2Switch").click();
    cy.get('[data-testid="beaconListing"]').click();
    cy.contains("Listing search");
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
      "results?searchType=listing&searchInInput=biosamples&id=SAMN03283350&searchByInput=individuals"
    );
  });
});
