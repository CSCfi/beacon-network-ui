import "cypress-localstorage-commands";

describe("Search history", () => {
  it("contains searches", () => {
    cy.clock().invoke("restore");
    cy.clock(Date.UTC(2021, 10, 30), ["Date"]);
    cy.visit("/");

    cy.get('[data-testid="exampleButton"]').click();
    cy.get('[data-testid="searchButton"]').click();

    cy.visit("/history");

    cy.clock().invoke("restore");
    cy.clock(Date.UTC(2021, 11, 15), ["Date"]);
    cy.visit("/");

    cy.get('[data-testid="exampleButton"]').click();
    cy.get('[data-testid="searchButton"]').click();

    cy.visit("/history");
    cy.clock().invoke("restore");
    cy.clock(Date.UTC(2021, 11, 30), ["Date"]);
    cy.visit("/");

    cy.get('[data-testid="exampleButton"]').click();
    cy.get('[data-testid="searchButton"]').click();

    cy.visit("/history");

    cy.contains("2021-11-30");
    cy.contains("2021-12-15");
    cy.contains("2021-12-30");
  });
  it("can be sorted desc", () => {
    cy.get(".is-sortable > .th-wrap").click();
    cy.get(".is-sortable > .th-wrap").click();
    cy.get(':nth-child(1) > [data-label="Date"]').contains("2021-12-30");
    cy.get(':nth-child(2) > [data-label="Date"]').contains("2021-12-15");
    cy.get(':nth-child(3) > [data-label="Date"]').contains("2021-11-30");
  });
  it("can be sorted asc", () => {
    cy.get(".is-sortable > .th-wrap").click();
    cy.get(':nth-child(3) > [data-label="Date"]').contains("2021-12-30");
    cy.get(':nth-child(2) > [data-label="Date"]').contains("2021-12-15");
    cy.get(':nth-child(1) > [data-label="Date"]').contains("2021-11-30");
  });
});
