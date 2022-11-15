import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  testUrl,
  testCirleSelector,
  testCircleContainerSelector,
  testAddButtonSelector,
  testHeadSelector,
  testIndexSelector,
  testDeleteButtonSelector,
  testRemoveButtonSelector,
} from "../../src/constants/constants";

describe("stack page display correctly", function () {
  before(function () {
    cy.visit(`${testUrl}/stack`);
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

  it("should elements add to stack correctly", function () {
    cy.get("input").type(firstElement);
    cy.get(testAddButtonSelector).click();

    cy.get(testCirleSelector).within(($letters) => {
      expect($letters).to.have.length(1);
      expect($letters.eq(0)).to.contain(firstElement);
      cy.get($letters.eq(0)).should("have.css", "border-color", modifiedColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
    });

    cy.get(testHeadSelector).within(($head) => {
      expect($head.eq(0)).to.contain("top");
    });

    cy.get(testIndexSelector).each(($el, index, $list) => {
      expect($el).to.contain(index);
    });

    cy.get("input").should("be.empty");
    cy.get("input").type(secondElement);
    cy.get(testAddButtonSelector).click();

    cy.get(testCirleSelector).within(($letters) => {
      expect($letters).to.have.length(2);
      expect($letters.eq(0)).to.contain(firstElement);
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(1)).should("have.css", "border-color", modifiedColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
    });

    cy.get(testHeadSelector).within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("top");
    });

    cy.get(testIndexSelector).each(($el, index, $list) => {
      expect($el).to.contain(index);
    });

    cy.get("input").should("be.empty");
    cy.get("input").type(thirdElement);
    cy.get(testAddButtonSelector).click();

    cy.get(testCirleSelector).within(($letters) => {
      expect($letters).to.have.length(3);
      expect($letters.eq(0)).to.contain(firstElement);
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      expect($letters.eq(1)).to.contain(secondElement);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(2)).should("have.css", "border-color", modifiedColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
    });

    cy.get(testHeadSelector).within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("");
      expect($head.eq(2)).to.contain("top");
    });

    cy.get(testIndexSelector).each(($el, index, $list) => {
      expect($el).to.contain(index);
    });
  });

  it("should elements delete from the stack correctly", function () {
    cy.get(testDeleteButtonSelector).click();

    cy.get(testCirleSelector).within(($letters) => {
      expect($letters.eq(2)).to.contain(thirdElement);
      cy.get($letters.eq(2)).should("have.css", "border-color", modifiedColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el, index, $list) => {
      cy.wait(SHORT_DELAY_IN_MS);
      expect($list).to.have.length(2);
    });

    cy.get(testCirleSelector).within(($letters) => {
      expect($letters).to.have.length(2);
      expect($letters.eq(0)).to.contain(firstElement);
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      expect($letters.eq(1)).to.contain(secondElement);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
    });

    cy.get(testHeadSelector).within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("top");
    });

    cy.get(testIndexSelector).each(($el, index, $list) => {
      expect($el).to.contain(index);
    });

    cy.get(testDeleteButtonSelector).click();

    cy.get(testCirleSelector).within(($letters) => {
      expect($letters.eq(1)).to.contain(secondElement);
      cy.get($letters.eq(1)).should("have.css", "border-color", modifiedColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el, index, $list) => {
      cy.wait(SHORT_DELAY_IN_MS);
      expect($list).to.have.length(1);
    });

    cy.get(testCirleSelector).within(($letters) => {
      expect($letters).to.have.length(1);
      expect($letters.eq(0)).to.contain(firstElement);
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
    });

    cy.get(testHeadSelector).within(($head) => {
      expect($head.eq(0)).to.contain("top");
    });

    cy.get(testIndexSelector).each(($el, index, $list) => {
      expect($el).to.contain(index);
    });

    cy.get(testDeleteButtonSelector).click();

    cy.get(testCirleSelector).within(($letters) => {
      expect($letters.eq(0)).to.contain(firstElement);
      cy.get($letters.eq(0)).should("have.css", "border-color", modifiedColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCircleContainerSelector).should("have.length", 0);
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
    cy.get(testCircleContainerSelector).should("have.length", 0);
  });
});
