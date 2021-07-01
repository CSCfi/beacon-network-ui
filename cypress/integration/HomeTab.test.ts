describe("Home tab", () => {
  describe("Basic search", () => {
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
      cy.get('[data-testid="displayResults"]').click();
      cy.contains("urn:hg:1000genome dataset location");
      cy.contains("T > C");
    });
    it("can hide results", () => {
      cy.get('[data-testid="displayResults"]').click();
      cy.contains("urn:hg:1000genome dataset location").should("not.exist");
      cy.contains("T > C").should("not.exist");
    });
    it("can do an invalid search", () => {
      cy.visit("/");
      cy.get('[data-testid="testBar"]').type("MT : 5 T > C");
      cy.get('[data-testid="searchButton"]').click();
      cy.contains("No results found.");
    });
  });
  describe("Advanced search", () => {
    it("successfully loads", () => {
      cy.visit("/");
      cy.get('[data-testid="advanced"]').click();
      cy.contains("Assembly");
    });
    it("can do a exmaple search", () => {
      cy.get('[data-testid="exampleButton"]').click();
      cy.get('[data-testid="searchTest"]').click();
      cy.contains("Development Beacon");
      cy.contains("Display 6 result(s)");
    });
    it("can show unknown beacons", () => {
      cy.get('[data-testid="unknownButton"]').click();
      cy.contains("ELIXIR-FI Beacon Aggregator");
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
});
