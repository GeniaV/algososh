import { testUrl } from "../../src/constants/constants";

describe("app works correctly with routes", function () {
  before(function () {
    cy.visit(testUrl);
  });

  it("should open string-page by link", function () {
    cy.visit(`${testUrl}/recursion`);
  });

  it("should open fibonacci-page by link", function () {
    cy.visit(`${testUrl}/fibonacci`);
  });

  it("should open sorting-page by link", function () {
    cy.visit(`${testUrl}/sorting`);
  });

  it("should open stack-page by link", function () {
    cy.visit(`${testUrl}/stack`);
  });

  it("should open queue-page by link", function () {
    cy.visit(`${testUrl}/queue`);
  });

  it("should open list-page by link", function () {
    cy.visit(`${testUrl}/list`);
  });
});