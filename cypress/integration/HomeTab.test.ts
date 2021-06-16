describe("Home tab", () => {
  describe("Basic search", () => {
    it("successfully loads", () => {
      cy.visit("/");
      cy.contains("Advanced Search");
    });
    it("can do a exmaple search", () => {
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
  });
});
