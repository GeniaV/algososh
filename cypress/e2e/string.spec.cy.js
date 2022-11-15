import { DELAY_IN_MS } from "../../src/constants/delays";
import { testUrl, testCirleSelector } from "../../src/constants/constants";

describe("string page display correctly", function () {
  before(function () {
    cy.visit(`${testUrl}/recursion`);
  });

  it("should button disabled if input is empty", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("srting should reverse correctly", function () {
    const stringLength = 5;

    const originalString = "hello";
    const firstStepColorsArr = [
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
    ];

    const inProcessString = "oellh";
    const secondStepColorsArr = [
      "rgb(127, 224, 81)",
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
      "rgb(127, 224, 81)",
    ];

    const finalString = "olleh";
    const finaStepColorsArr = [
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
    ];

    cy.get("input").type(originalString);
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.get(testCirleSelector).each(($el, index, $list) => {
      cy.get($list).should("have.length", stringLength);
      cy.get($el).contains(originalString[index]);
      cy.get($el).should("have.css", "border-color", firstStepColorsArr[index]);
    });

    cy.wait(DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el, index, $list) => {
      cy.get($list).should("have.length", stringLength);
      cy.get($el).contains(inProcessString[index]);
      cy.get($el).should(
        "have.css",
        "border-color",
        secondStepColorsArr[index]
      );
    });

    cy.wait(DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el, index, $list) => {
      cy.get($list).should("have.length", stringLength);
      cy.get($el).contains(finalString[index]);
      cy.get($el).should("have.css", "border-color", finaStepColorsArr[index]);
    });
  });
});