import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("list page display correctly", function () {
  before(function () {
    cy.visit("http://localhost:3000/list");
  });

  const defaultColor = "rgb(0, 50, 255)";
  const modifiedColor = "rgb(210, 82, 225)";
  const changingColor = "rgb(127, 224, 81)";

  const value = 1;
  const index = 2;

  it("should add button and delete by index button disabled if input is empty", function () {
    cy.get("input").should("be.empty");
    cy.get("[data-testid=addIntoHead]").should("be.disabled");
    cy.get("[data-testid=addIntoTail]").should("be.disabled");
    cy.get("[data-testid=addByIndex]").should("be.disabled");
    cy.get("[data-testid=deleteByIndex]").should("be.disabled");
  });

  it("should default list renders", function () {
    cy.get("#linkedList").find("li");
    cy.get("[data-testid=circle-cont]").should("have.length", 4);

    cy.get("[data-testid=circle]").each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get('[data-testid ="letter"]').each(($letter) => {
      [][0] = $letter.text();
      [][1] = $letter.text();
      [][2] = $letter.text();
      [][3] = $letter.text();
    });

    cy.get("[data-testid=head]").within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "tail");
    });

    cy.get("[data-testid=index]").each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });

    cy.get("[data-testid=arrow]").should("have.length", 3);
  });

  it("should add to head works correctly", function () {
    cy.get("[data-testid=inputValue]").should("be.empty");
    cy.get("[data-testid=inputValue]").type(value);

    cy.get("[data-testid=addIntoHead]").click();

    cy.get("[data-testid=topCircle]");

    cy.get("[data-testid=topCircle]").contains(value);
    cy.get("[data-testid=topCircle]")
      .find("[class*=small]")
      .should("have.css", "border-color", modifiedColor);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[data-testid=circle-cont]").should("have.length", 5);

    cy.get("[data-testid=arrow]").should("have.length", 4);

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", changingColor);
      cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[data-testid=circle]").each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
      cy.get($head.eq(4)).should("contain", "");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "");
      cy.get($tail.eq(4)).should("contain", "tail");
    });

    cy.get("[data-testid=index]").each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });
  });

  it("should add to tail works correctly", function () {
    cy.get("[data-testid=inputValue]").should("be.empty");
    cy.get("[data-testid=inputValue]").type(value);

    cy.get("[data-testid=addIntoTail]").click();

    cy.get("[data-testid=topCircle]");

    cy.get("[data-testid=topCircle]").contains(value);
    cy.get("[data-testid=topCircle]")
      .find("[class*=small]")
      .should("have.css", "border-color", modifiedColor);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[data-testid=circle-cont]").should("have.length", 6);

    cy.get("[data-testid=arrow]").should("have.length", 5);

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(5)).should("have.css", "border-color", changingColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[data-testid=circle]").each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
      cy.get($head.eq(4)).should("contain", "");
      cy.get($head.eq(5)).should("contain", "");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "");
      cy.get($tail.eq(4)).should("contain", "");
      cy.get($tail.eq(5)).should("contain", "tail");
    });

    cy.get("[data-testid=index]").each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });
  });

  it("should delete from the head correctly", function () {
    cy.get("[data-testid=deleteFromTheHead]").click();

    cy.get("[data-testid=bottomCircle]");

    cy.get("[data-testid=bottomCircle]").contains(value);
    cy.get("[data-testid=bottomCircle]")
      .find("[class*=circle_small]")
      .should("have.css", "border-color", modifiedColor);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[data-testid=circle-cont]").should("have.length", 5);

    cy.get("[data-testid=arrow]").should("have.length", 4);

    cy.get("[data-testid=circle]").each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
      cy.get($head.eq(4)).should("contain", "");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "");
      cy.get($tail.eq(4)).should("contain", "tail");
    });

    cy.get("[data-testid=index]").each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });
  });

  it("should delete from the tail correctly", function () {
    cy.get("[data-testid=deleteFromTheTail]").click();

    cy.get("[data-testid=bottomCircle]");

    cy.get("[data-testid=bottomCircle]").contains(value);
    cy.get("[data-testid=bottomCircle]")
      .find("[class*=circle_small]")
      .should("have.css", "border-color", modifiedColor);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[data-testid=circle-cont]").should("have.length", 4);

    cy.get("[data-testid=arrow]").should("have.length", 3);

    cy.get("[data-testid=circle]").each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "tail");
    });

    cy.get("[data-testid=index]").each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });
  });

  it("should add by index correctly", function () {
    cy.get("[data-testid=inputValue]").should("be.empty");
    cy.get("[data-testid=inputValue]").type(value);

    cy.get("[data-testid=indexValue]").should("be.empty");
    cy.get("[data-testid=indexValue]").type(index);

    cy.get("[data-testid=addByIndex]").click();

    cy.get("[data-testid=topCircle]");

    cy.get("[data-testid=topCircle]").contains(value);
    cy.get("[data-testid=topCircle]")
      .find("[class*=small]")
      .should("have.css", "border-color", modifiedColor);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", modifiedColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.get($list.eq(1)).should("have.css", "border-color", modifiedColor);
    });

    cy.get("[data-testid=circle-cont]").should("have.length", 5);

    cy.get("[data-testid=arrow]").should("have.length", 4);

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(2)).should("have.css", "border-color", changingColor);
      expect($list.eq(2)).to.contain(value);
      cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[data-testid=circle]").each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
      cy.get($head.eq(4)).should("contain", "");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "");
      cy.get($tail.eq(4)).should("contain", "tail");
    });

    cy.get("[data-testid=index]").each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });
  });

  it("should delete by index correctly", function () {
    cy.get("[data-testid=indexValue]").should("be.empty");
    cy.get("[data-testid=indexValue]").type(index);
    cy.get("[data-testid=deleteByIndex]").click();

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", modifiedColor);
      cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", modifiedColor);
      cy.get($list.eq(1)).should("have.css", "border-color", modifiedColor);
      cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[data-testid=circle]").each(($el, index, $list) => {
      cy.get($list.eq(0)).should("have.css", "border-color", modifiedColor);
      cy.get($list.eq(1)).should("have.css", "border-color", modifiedColor);
      cy.get($list.eq(2)).should("have.css", "border-color", modifiedColor);
      cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
      cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=bottomCircle]");

    cy.get("[data-testid=bottomCircle]").contains(value);
    cy.get("[data-testid=bottomCircle]")
      .find("[class*=small]")
      .should("have.css", "border-color", modifiedColor);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[data-testid=circle-cont]").should("have.length", 4);

    cy.get("[data-testid=arrow]").should("have.length", 3);

    cy.get("[data-testid=circle]").each(($el) => {
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=head]").within(($head) => {
      cy.get($head.eq(0)).should("contain", "head");
      cy.get($head.eq(1)).should("contain", "");
      cy.get($head.eq(2)).should("contain", "");
      cy.get($head.eq(3)).should("contain", "");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      cy.get($tail.eq(0)).should("contain", "");
      cy.get($tail.eq(1)).should("contain", "");
      cy.get($tail.eq(2)).should("contain", "");
      cy.get($tail.eq(3)).should("contain", "tail");
    });

    cy.get("[data-testid=index]").each(($el, index, $list) => {
      cy.get($el).should("contain", index);
    });
  });
});