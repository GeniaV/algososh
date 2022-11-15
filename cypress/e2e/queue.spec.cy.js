import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  testUrl,
  testHeadSelector,
  testTailSelector,
  testCirleSelector,
  testAddButtonSelector,
  testIndexSelector,
  testDeleteButtonSelector,
  testRemoveButtonSelector,
} from "../../src/constants/constants";

describe("queue page display correctly", function () {
  before(function () {
    cy.visit(`${testUrl}/queue`);
  });

  it("should button disabled if input is empty", function () {
    cy.get("input").should("be.empty");
    cy.get(testAddButtonSelector).should("be.disabled");
  });

  const modifiedColor = "rgb(210, 82, 225)";
  const defaultColor = "rgb(0, 50, 255)";

  const firstElement = 1;
  const secondElement = 2;
  const thirdElement = 3;

  it("should elements add to the queue correctly", function () {
    cy.get(testCirleSelector).each(($list) => {
      cy.get($list).should("have.css", "border-color", defaultColor);
    });

    cy.get("input").should("be.empty");
    cy.get("input").type(firstElement);
    cy.get(testAddButtonSelector).click();

    cy.get(testCirleSelector).within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", modifiedColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
    });

    cy.get(testCirleSelector).within(($letters) => {
      expect($letters.eq(0)).to.contain(firstElement);
    });

    cy.get(testHeadSelector).within(($head) => {
      expect($head.eq(0)).to.contain("head");
    });

    cy.get(testTailSelector).within(($tail) => {
      expect($tail.eq(0)).to.contain("tail");
    });

    cy.get(testIndexSelector).each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get("input").should("be.empty");
    cy.get("input").type(secondElement);
    cy.get(testAddButtonSelector).click();

    cy.get(testCirleSelector).within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(1)).should("have.css", "border-color", modifiedColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
    });

    cy.get(testCirleSelector).within(($letters) => {
      expect($letters.eq(0)).to.contain(firstElement);
      expect($letters.eq(1)).to.contain(secondElement);
    });

    cy.get(testHeadSelector).within(($head) => {
      expect($head.eq(0)).to.contain("head");
      expect($head.eq(1)).to.contain("");
    });

    cy.get(testTailSelector).within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("tail");
    });

    cy.get(testIndexSelector).each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get("input").should("be.empty");
    cy.get("input").type(thirdElement);
    cy.get(testAddButtonSelector).click();

    cy.get(testCirleSelector).within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(2)).should("have.css", "border-color", modifiedColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
    });

    cy.get(testCirleSelector).within(($letters) => {
      expect($letters.eq(0)).to.contain(firstElement);
      expect($letters.eq(1)).to.contain(secondElement);
      expect($letters.eq(2)).to.contain(thirdElement);
    });

    cy.get(testHeadSelector).within(($head) => {
      expect($head.eq(0)).to.contain("head");
      expect($head.eq(1)).to.contain("");
      expect($head.eq(2)).to.contain("");
    });

    cy.get(testTailSelector).within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("");
      expect($tail.eq(2)).to.contain("tail");
    });

    cy.get(testIndexSelector).each(($el, index) => {
      expect($el).to.contain(index);
    });
  });

  it("should elements delete from the queue correctly", function () {
    cy.get(testDeleteButtonSelector).click();

    cy.get(testCirleSelector).within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", modifiedColor);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
    });

    cy.get(testCirleSelector).within(($letters) => {
      expect($letters.eq(0)).to.contain("");
      expect($letters.eq(1)).to.contain(secondElement);
      expect($letters.eq(2)).to.contain(thirdElement);
    });

    cy.get(testHeadSelector).within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("head");
      expect($head.eq(2)).to.contain("");
    });

    cy.get(testTailSelector).within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("");
      expect($tail.eq(2)).to.contain("tail");
    });

    cy.get(testIndexSelector).each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get(testDeleteButtonSelector).click();

    cy.get(testCirleSelector).within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(1)).should("have.css", "border-color", modifiedColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
    });

    cy.get(testCirleSelector).within(($letters) => {
      expect($letters.eq(0)).to.contain("");
      expect($letters.eq(1)).to.contain("");
      expect($letters.eq(2)).to.contain(thirdElement);
    });

    cy.get(testHeadSelector).within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("");
      expect($head.eq(2)).to.contain("head");
    });

    cy.get(testTailSelector).within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("");
      expect($tail.eq(2)).to.contain("tail");
    });

    cy.get(testIndexSelector).each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get(testDeleteButtonSelector).click();

    cy.get(testCirleSelector).within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(2)).should("have.css", "border-color", modifiedColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
    });

    cy.get(testCirleSelector).within(($letters) => {
      expect($letters.eq(0)).to.contain("");
      expect($letters.eq(1)).to.contain("");
      expect($letters.eq(2)).to.contain("");
    });

    cy.get(testHeadSelector).within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("");
      expect($head.eq(2)).to.contain("");
    });

    cy.get(testTailSelector).within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("");
      expect($tail.eq(2)).to.contain("");
    });

    cy.get(testIndexSelector).each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get(testCirleSelector).each(($list) => {
      expect($list).to.contain("");
    });
  });

  it("should remove button works correctly", function () {
    cy.get("input").should("be.empty");
    cy.get("input").type(firstElement);
    cy.get(testAddButtonSelector).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("input").should("be.empty");
    cy.get("input").type(secondElement);
    cy.get(testAddButtonSelector).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("input").should("be.empty");
    cy.get("input").type(thirdElement);
    cy.get(testAddButtonSelector).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testRemoveButtonSelector).click();

    cy.get(testCirleSelector).each(($list) => {
      expect($list).to.contain("");
    });
  });
});
