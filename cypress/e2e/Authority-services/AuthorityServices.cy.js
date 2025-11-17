import AthorityServicesSelectors from "./AthorityServicesSelectors";

describe("Authority 262 - appointment buttons", () => {
  beforeEach(() => {
    // Open the authority page before each test
    cy.visit("https://govisit.gov.il/he/authorities/authority/262");
  });

  it("should click all 'לזימון תור' buttons and verify URLs", () => {
    cy.wait(10000); // Wait for all services to load

    // Iterate through all appointment buttons
    cy.get(AthorityServicesSelectors.scheduleAppointment).each(($btn) => {
      cy.wrap($btn).click({force: true});

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
