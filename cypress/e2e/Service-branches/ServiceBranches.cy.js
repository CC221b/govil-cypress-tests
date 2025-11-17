describe('Gov.il - Service Branches API requests', () => {

  beforeEach(() => {
    // Intercept three API requests on page load
    cy.intercept('GET', '**/BureausWebApi/bureaus/GetAggregationCities*').as('getCities');
    cy.intercept('GET', '**/BureausWebApi/bureaus/GetAggregationCategories').as('getCategories');
    cy.intercept('GET', '**/BureausWebApi/bureaus/GetAggregationUnits').as('getUnits');

    // Visit the service branches page
    cy.visit('https://www.gov.il/he/government-service-branches');
  });

  it('should return 200 status for all main API requests', () => {
    // Validate each API responds with 200 OK
    cy.wait('@getCities').its('response.statusCode').should('eq', 200);
    cy.wait('@getCategories').its('response.statusCode').should('eq', 200);
    cy.wait('@getUnits').its('response.statusCode').should('eq', 200);
  });
});

