import AthorityServicesSelectors from "./AthorityServicesSelectors";

describe("Authority 262 - appointment buttons", () => {
  beforeEach(() => {
    cy.visit("https://govisit.gov.il/he/authorities/authority/262");
  });

  it( "Should appointment buttons include 'appointment'", () => {
    cy.wait(10000); // Wait for all services to load

    // Iterate through all appointment buttons
    cy.get(AthorityServicesSelectors.service).each(($service) => {
      cy.wrap($service).within(() => {
        cy.get("button").contains("לזימון תור").click();
      });

      // Check that the navigation URL is correct
      cy.url().then((url) => {
        if (url === "https://govisit.gov.il/he/app/auth/login") {
          cy.log("Skipped login page"); // Login page is expected in some cases
        } else {
          expect(url).to.include("appointment"); // All other cases should redirect to appointment pages
        }
      });

      cy.go("back"); // Return to the services page before next iteration
    });
  });
});
