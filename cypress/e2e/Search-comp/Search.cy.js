import SearchSelectors from "./SearchSelectors";
import SearchFunc from "./SearchFunc";

describe("Gov.il Search Tests", () => {
  beforeEach(() => {
    // Open homepage and expand the search box
    cy.visit("https://www.gov.il/");
    SearchFunc.openSearch();
  });

  it("Search Results Page URL", () => {
    // Verify the search URL includes the encoded query
    SearchFunc.searchFor("דרכון");
    cy.url().should("include", `query=${SearchFunc.encoded("דרכון")}`);
  });

  it("valid search results", () => {
    // Validate each result contains the searched term
    SearchFunc.searchFor("דרכון");
    cy.get(SearchSelectors.resultItem).each((item) => {
      cy.wrap(item).should("contain.text", "דרכון");
    });
  });

  it("Invalid characters input", () => {
    // Searching invalid characters should trigger the error page
    SearchFunc.searchFor('</""/>');
    cy.intercept("GET", "**/Error?aspxerrorpath=/Rejected-By-UrlScan").as("errorPage");
    cy.wait("@errorPage").its("response.statusCode").should("eq", 404);
    cy.url().should("include", "/Error?aspxerrorpath=/Rejected-By-UrlScan");
  });

  it("No search results", () => {
    // When no results found, verify empty list and 'no results' message
    let query = "דרכוןVISA";
    SearchFunc.searchFor(query);

    cy.get(SearchSelectors.resultItem).should("have.length", 0);

    cy.get(SearchSelectors.results)
      .should("contain.text", "לא נמצאו")
      .and("contain.text", `תוצאות לערך "${query}"`);
  });
});

