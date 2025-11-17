# Gov.il Automated Cypress Tests

This project contains Cypress automated tests for different pages of the Gov.il website. Each test suite focuses on a specific functionality.

Repository: [https://github.com/CC221b/govil-cypress-tests]

---
## 1. Gov.il Search Tests

**File:** `Search.cy.js`

**Purpose:**  
- Tests the search functionality on the Gov.il homepage.  

**Key Points:**  
- Checks that the search URL includes the correct query.  
- Verifies that search results contain the searched term.  
- Handles invalid input and verifies error pages.  
- Checks the behavior when no search results are found.

---

## 2. Service Branches API Requests

**File:** `ServiceBranches.cy.js`

**Purpose:**  
- Validates that the main API requests on the Service Branches page return a `200 OK` status.  

**Key Points:**  
- Intercepts `GetAggregationCities`, `GetAggregationCategories`, and `GetAggregationUnits` API calls.  
- Uses `cy.wait` to ensure each API call completes before asserting the status code.

---

## 3. Authority 262 Appointment Buttons

**File:** `AuthorityServices.cy.js`

**Purpose:**  
- Verifies that the appointment button URL contains "appointment"

**Key Points:**  
- Iterates through each appointment button and clicks it.  
- Verifies that the resulting URL contains "appointment"

---

## 4. Main Banner Test

**File:** `MainBanner.cy.js`

**Purpose:**  
- Replaces the main banner on the Prime Minister's Office page with banner data from another authority.  
- Verifies that the banner items display correctly, including links, images.

**Key Points:**  
- Uses `cy.request` to fetch data from the Ministry of Public Security.  
- Uses `cy.intercept` to inject the fetched banner data into the target page.  
- Validates desktop and mobile images, links.

---

## Usage

1. Install Cypress if not already installed:  
```bash
npm install cypress --save-dev
