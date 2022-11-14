import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { testUrl, testCirleSelector } from "../../src/constants/constants";

describe("fibonacci page display correctly", function () {
  before(function () {
    cy.visit(`${testUrl}/fibonacci`);
  });

  it("should button disabled if input is empty", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("should fibonacci numbers render correctly", function () {
    const numberForFibonacci = 5;
    const fibonacciArr = [1, 1, 2, 3, 5, 8];
    const color = "rgb(0, 50, 255)";

    cy.get("input").type(numberForFibonacci);
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.get(testCirleSelector).each(($el, index) => {
      cy.get($el).contains(fibonacciArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el, index) => {
      cy.get($el).contains(fibonacciArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el, index) => {
      cy.get($el).contains(fibonacciArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el, index) => {
      cy.get($el).contains(fibonacciArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el, index) => {
      cy.get($el).contains(fibonacciArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el, index) => {
      cy.get($el).contains(fibonacciArr[index]);
      cy.get($el).should("have.css", "border-color", color);
    });

    cy.wait(SHORT_DELAY_IN_MS);
  });
});
