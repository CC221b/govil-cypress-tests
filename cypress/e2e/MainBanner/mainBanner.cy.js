import MainBannerSelectors from "./MainBannerSelectors";

describe("Main Banner Test", () => {
  it("should replace main banner with data from another page and verify items", () => {
    // Fetch banner data from a different authority
    cy.request(
      "GET",
      "https://www.gov.il/govil-landing-page-api/he/api/offices/get/ministry_of_public_security"
    ).then((res) => {
      const mainBannerData = res.body.mainBanner;

      // Intercept target page request and inject the fetched banner data
      cy.intercept(
        "GET",
        "https://www.gov.il/govil-landing-page-api/he/api/offices/get/prime_ministers_office",
        (req) => {
          req.continue((res) => {
            res.body.mainBanner = mainBannerData;
          });
        }
      ).as("mainBanner");

      // Visit the page and wait for interception
      cy.visit(
        "https://www.gov.il/he/departments/prime_ministers_office/govil-landing-page"
      );
      cy.wait("@mainBanner");

      // Stop banner slider
      cy.get(MainBannerSelectors.playBtn).click();

      const firstItem = mainBannerData.bannerItems[0];

      // Validate first banner item content
      cy.get(MainBannerSelectors.bannerItem)
        .eq(0)
        .within(() => {
          cy.get("a")
            .should("have.attr", "href", firstItem.link.url)
            .and("have.attr", "id", firstItem.link.id);

          cy.get(MainBannerSelectors.imgDesktop)
            .should("have.attr", "src", firstItem.imgDesktop.src)
            .and("have.attr", "alt", firstItem.imgDesktop.alt);

          cy.get(MainBannerSelectors.imgMobile)
            .should("have.attr", "data-src", firstItem.imgMobile.src)
            .and("have.attr", "alt", firstItem.imgMobile.alt);
        });
    });
  });
});
