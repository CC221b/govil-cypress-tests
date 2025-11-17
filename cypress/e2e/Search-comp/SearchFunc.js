import SearchSelectors from "./SearchSelectors";

class SearchFunc {
  static openSearch() {
    cy.get(SearchSelectors.mainSearch).should("be.visible").click();
  }

  static searchFor(query) {
    cy.get(SearchSelectors.searchInput).type(`${query}{enter}`);
  }

  static encoded(query){
    return encodeURIComponent(query)
  }
}

export default SearchFunc;
