import "cypress-localstorage-commands";

describe("Basic Search", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.contains("Advanced Search");
  });
  it("can do a example search", () => {
    cy.get('[data-testid="exampleButton"]').click();
    cy.get('[data-testid="searchButton"]').click();
    cy.contains("Development Beacon");
    cy.contains("Display 1 result(s)");
  });
  it("can display results", () => {
    cy.get('[data-testid="fi.rahtiapp.staging-elixirbeacon"]').click({multiple: true});
    cy.wait(3000);
    cy.contains("urn:hg:1000genome dataset location");
    cy.contains("T > C");
  });
  it("can hide results", () => {
    cy.get('[data-testid="fi.rahtiapp.staging-elixirbeacon"]').click({multiple: true});
    cy.contains("urn:hg:1000genome dataset location").should("not.exist");
    cy.contains("T > C").should("not.exist");
  });
  it("can do an invalid search", () => {
    cy.visit("/");
    cy.get('[data-testid="testBar"]').clear();
    cy.get('[data-testid="testBar"]').type("MT : 5 T > C");
    cy.get('[data-testid="searchButton"]').click();
    cy.contains("No results found.");
    cy.saveLocalStorage();
  });
  it("generates search history", () => {
    cy.restoreLocalStorage();
    // history only shows the invalid search because cy.saveLocalStorage(); overwrites cy.saveLocalStorage(); in example search
    cy.get(".navbar-burger").click();
    cy.get('[data-testid="historyButton"]').click();
    cy.contains(
      "results?searchType=basic&includeDatasetResponses=HIT&assemblyId=GRCh38&referenceName=MT&start=4&referenceBases=T&alternateBases=C"
    );
  });
});
