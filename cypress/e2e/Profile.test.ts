describe("Profile page", () => {
  it("successfully displays user info", () => {
    cy.intercept(
      {
        method: "GET",
        url: "**/userinfo",
      },
      {
        sub: "testSub",
        name: "Tester Name",
        preferred_username: "Tester",
        email: ["tester@test.com", true],
        "Dataset access": ["Test set"],
        "Bona fide status": "Unverified",
      }
    ).as("getUserInfo");
    cy.visit("/profile");
    cy.wait("@getUserInfo").then(console.log);

    cy.contains("testSub");
    cy.contains("Tester Name");
    cy.contains("tester@test.com");
    cy.contains("Verified");
    cy.contains("Test set");
    cy.contains("Unverified");
  });
});
