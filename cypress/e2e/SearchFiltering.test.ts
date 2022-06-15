describe("Search filtering", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.get("#v2Switch").click();
    cy.get('[data-testid="beaconListing"]').click();
    cy.contains("Listing search");
  });
  it("can filter results", () => {
    cy.get('[data-testid="inInput"]').select("biosamples");
    cy.get('[data-testid="searchTest"]').click();
    cy.contains("Display 3 result(s)");
    cy.contains("td", "myopia").parent("tr").children().first().click();
    cy.contains("id: HP:0000545").click();
    cy.get('[data-testid="filterButton"]').click();
    cy.contains("Display 1 result(s)");
  });
});
