import "cypress-localstorage-commands";

describe("Basic Search version 2", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.get("#v2Switch").click();
    cy.contains("v2 search");
  });
  it("can do a example search", () => {
    cy.get('[data-testid="exampleButton"]').click();
    cy.get('[data-testid="searchButton"]').click();
    cy.contains("European Genome-Phenome Archive (EGA)");
    cy.contains("Display 1 result(s)");
  });
  it("can display results", () => {
    cy.get('[data-testid="beacon:5050"]').click();
    cy.wait(3000);
    cy.contains("variants id: 1313772");
  });
  it("can hide results", () => {
    cy.get('[data-testid="beacon:5050"]').click();
    cy.contains("variants id: 1313772").should("not.exist");
  });
  it("can do an invalid search", () => {
    cy.visit("/");
    cy.get("#v2Switch").click();
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
      "results?searchInInput=individuals&searchType=basic&includeDatasetResponses=HIT&assemblyId=GRCh38&referenceName=MT&start=4&referenceBases=T&alternateBases=C"
    );
  });
});
