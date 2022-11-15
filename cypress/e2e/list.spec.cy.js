import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  testUrl,
  testHeadSelector,
  testTailSelector,
  testCirleSelector,
  testAddByIndexButtonSelector,
  testDeleteByIndexButtonSelector,
  testAddToHeadButtonSelector,
  testAddToTailButtonSelector,
  testCircleContainerSelector,
  testIndexSelector,
  testArrowSelector,
  testInputValueSelector,
  testTopCircleSelector,
  testDeletFromTheHeadButtonSelector,
  testBottomCircleSelector,
  testDeleteFromTheTailSelector,
  testIndexValueSelector,
  testSmallCircleClass,
} from "../../src/constants/constants";

describe("list page display correctly", function () {
  before(function () {
    cy.visit(`${testUrl}/list`);
  });

  const defaultColor = "rgb(0, 50, 255)";
  const modifiedColor = "rgb(210, 82, 225)";
  const changingColor = "rgb(127, 224, 81)";

  const value = 1;
  const index = 2;

  it("should add button and delete by index button disabled if input is empty", function () {
    cy.get("input").should("be.empty");
    cy.get(testAddToHeadButtonSelector).should("be.disabled");
    cy.get(testAddToTailButtonSelector).should("be.disabled");
    cy.get(testAddByIndexButtonSelector).should("be.disabled");
    cy.get(testDeleteByIndexButtonSelector).should("be.disabled");
  });

  it("should default list renders", function () {
    cy.get("#linkedList").find("li");
    cy.get(testCircleContainerSelector).should("have.length", 4);

    cy.get(testCirleSelector).each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get('[data-testid ="letter"]').each(($letter) => {
      [][0] = $letter.text();
      [][1] = $letter.text();
      [][2] = $letter.text();
      [][3] = $letter.text();
    });

    cy.get(testHeadSelector).within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
    });

    cy.get(testTailSelector).within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "tail");
    });

    cy.get(testIndexSelector).each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });

    cy.get(testArrowSelector).should("have.length", 3);
  });

  it("should add to head works correctly", function () {
    cy.get(testInputValueSelector).should("be.empty");
    cy.get(testInputValueSelector).type(value);

    cy.get(testAddToHeadButtonSelector).click();

    cy.get(testTopCircleSelector);

    cy.get(testTopCircleSelector).contains(value);
    cy.get(testTopCircleSelector)
      .find(testSmallCircleClass)
      .should("have.css", "border-color", modifiedColor);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCircleContainerSelector).should("have.length", 5);

    cy.get(testArrowSelector).should("have.length", 4);

    cy.get(testCirleSelector).each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", changingColor);
      cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get(testHeadSelector).within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
      cy.get($head.eq(4)).should("contain", "");
    });

    cy.get(testTailSelector).within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "");
      cy.get($tail.eq(4)).should("contain", "tail");
    });

    cy.get(testIndexSelector).each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });
  });

  it("should add to tail works correctly", function () {
    cy.get(testInputValueSelector).should("be.empty");
    cy.get(testInputValueSelector).type(value);

    cy.get(testAddToTailButtonSelector).click();

    cy.get(testTopCircleSelector);

    cy.get(testTopCircleSelector).contains(value);
    cy.get(testTopCircleSelector)
      .find(testSmallCircleClass)
      .should("have.css", "border-color", modifiedColor);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCircleContainerSelector).should("have.length", 6);

    cy.get(testArrowSelector).should("have.length", 5);

    cy.get(testCirleSelector).each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(5)).should("have.css", "border-color", changingColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get(testHeadSelector).within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
      cy.get($head.eq(4)).should("contain", "");
      cy.get($head.eq(5)).should("contain", "");
    });

    cy.get(testTailSelector).within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "");
      cy.get($tail.eq(4)).should("contain", "");
      cy.get($tail.eq(5)).should("contain", "tail");
    });

    cy.get(testIndexSelector).each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });
  });

  it("should delete from the head correctly", function () {
    cy.get(testDeletFromTheHeadButtonSelector).click();

    cy.get(testBottomCircleSelector);

    cy.get(testBottomCircleSelector).contains(value);
    cy.get(testBottomCircleSelector)
      .find(testSmallCircleClass)
      .should("have.css", "border-color", modifiedColor);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCircleContainerSelector).should("have.length", 5);

    cy.get(testArrowSelector).should("have.length", 4);

    cy.get(testCirleSelector).each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get(testHeadSelector).within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
      cy.get($head.eq(4)).should("contain", "");
    });

    cy.get(testTailSelector).within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "");
      cy.get($tail.eq(4)).should("contain", "tail");
    });

    cy.get(testIndexSelector).each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });
  });

  it("should delete from the tail correctly", function () {
    cy.get(testDeleteFromTheTailSelector).click();

    cy.get(testBottomCircleSelector);

    cy.get(testBottomCircleSelector).contains(value);
    cy.get(testBottomCircleSelector)
      .find(testSmallCircleClass)
      .should("have.css", "border-color", modifiedColor);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCircleContainerSelector).should("have.length", 4);

    cy.get(testArrowSelector).should("have.length", 3);

    cy.get(testCirleSelector).each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get(testHeadSelector).within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
    });

    cy.get(testTailSelector).within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "tail");
    });

    cy.get(testIndexSelector).each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });
  });

  it("should add by index correctly", function () {
    cy.get(testInputValueSelector).should("be.empty");
    cy.get(testInputValueSelector).type(value);

    cy.get(testIndexValueSelector).should("be.empty");
    cy.get(testIndexValueSelector).type(index);

    cy.get(testAddByIndexButtonSelector).click();

    cy.get(testTopCircleSelector);

    cy.get(testTopCircleSelector).contains(value);
    cy.get(testTopCircleSelector)
      .find(testSmallCircleClass)
      .should("have.css", "border-color", modifiedColor);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", modifiedColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCirleSelector).each(($el, index, $list) => {
      cy.get($list.eq(1)).should("have.css", "border-color", modifiedColor);
    });

    cy.get(testCircleContainerSelector).should("have.length", 5);

    cy.get(testArrowSelector).should("have.length", 4);

    cy.get(testCirleSelector).each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(2)).should("have.css", "border-color", changingColor);
      expect($list.eq(2)).to.contain(value);
      cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get(testHeadSelector).within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
      cy.get($head.eq(4)).should("contain", "");
    });

    cy.get(testTailSelector).within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "");
      cy.get($tail.eq(4)).should("contain", "tail");
    });

    cy.get(testIndexSelector).each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });
  });

  it("should delete by index correctly", function () {
    cy.get(testIndexValueSelector).should("be.empty");
    cy.get(testIndexValueSelector).type(index);
    cy.get(testDeleteByIndexButtonSelector).click();

    cy.get(testCirleSelector).each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", modifiedColor);
      cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", modifiedColor);
      cy.get($list.eq(1)).should("have.css", "border-color", modifiedColor);
      cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCirleSelector).each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", modifiedColor);
      cy.get($list.eq(1)).should("have.css", "border-color", modifiedColor);
      cy.get($list.eq(2)).should("have.css", "border-color", modifiedColor);
      cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
    });

    cy.get(testBottomCircleSelector);

    cy.get(testBottomCircleSelector).contains(value);
    cy.get(testBottomCircleSelector)
      .find(testSmallCircleClass)
      .should("have.css", "border-color", modifiedColor);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCircleContainerSelector).should("have.length", 4);

    cy.get(testArrowSelector).should("have.length", 3);

    cy.get(testCirleSelector).each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get(testHeadSelector).within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
    });

    cy.get(testTailSelector).within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "tail");
    });

    cy.get(testIndexSelector).each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });
  });
});
