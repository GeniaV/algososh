import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("queue page display correctly", function () {
  before(function () {
    cy.visit("http://localhost:3000/queue");
  });

  it("should button disabled if input is empty", function () {
    cy.get("input").should("be.empty");
    cy.get("[data-testid=addBtn]").should("be.disabled");
  });

  const modifiedColor = "rgb(210, 82, 225)";
  const defaultColor = "rgb(0, 50, 255)";

  const firstElement = 1;
  const secondElement = 2;
  const thirdElement = 3;

  it("should elements add to the queue correctly", function () {
    cy.get("[data-testid=circle]").each(($list) => {
      cy.get($list).should("have.css", "border-color", defaultColor);
    });

    cy.get("input").should("be.empty");
    cy.get("input").type(firstElement);
    cy.get("[data-testid=addBtn]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", modifiedColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(0)).to.contain(firstElement);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("head");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      expect($tail.eq(0)).to.contain("tail");
    });

    cy.get("[data-testid=index]").each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get("input").should("be.empty");
    cy.get("input").type(secondElement);
    cy.get("[data-testid=addBtn]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(1)).should("have.css", "border-color", modifiedColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(0)).to.contain(firstElement);
      expect($letters.eq(1)).to.contain(secondElement);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("head");
      expect($head.eq(1)).to.contain("");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("tail");
    });

    cy.get("[data-testid=index]").each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get("input").should("be.empty");
    cy.get("input").type(thirdElement);
    cy.get("[data-testid=addBtn]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(2)).should("have.css", "border-color", modifiedColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(0)).to.contain(firstElement);
      expect($letters.eq(1)).to.contain(secondElement);
      expect($letters.eq(2)).to.contain(thirdElement);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("head");
      expect($head.eq(1)).to.contain("");
      expect($head.eq(2)).to.contain("");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("");
      expect($tail.eq(2)).to.contain("tail");
    });

    cy.get("[data-testid=index]").each(($el, index) => {
      expect($el).to.contain(index);
    });
  });

  it("should elements delete from the queue correctly", function () {
    cy.get("[data-testid=deleteBtn]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", modifiedColor);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(0)).to.contain("");
      expect($letters.eq(1)).to.contain(secondElement);
      expect($letters.eq(2)).to.contain(thirdElement);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("head");
      expect($head.eq(2)).to.contain("");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("");
      expect($tail.eq(2)).to.contain("tail");
    });

    cy.get("[data-testid=index]").each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get("[data-testid=deleteBtn]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(1)).should("have.css", "border-color", modifiedColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(0)).to.contain("");
      expect($letters.eq(1)).to.contain("");
      expect($letters.eq(2)).to.contain(thirdElement);
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("");
      expect($head.eq(2)).to.contain("head");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("");
      expect($tail.eq(2)).to.contain("tail");
    });

    cy.get("[data-testid=index]").each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get("[data-testid=deleteBtn]").click();

    cy.get("[data-testid=circle]").within(($letters) => {
      cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
      cy.get($letters.eq(2)).should("have.css", "border-color", modifiedColor);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
    });

    cy.get("[data-testid=circle]").within(($letters) => {
      expect($letters.eq(0)).to.contain("");
      expect($letters.eq(1)).to.contain("");
      expect($letters.eq(2)).to.contain("");
    });

    cy.get("[data-testid=head]").within(($head) => {
      expect($head.eq(0)).to.contain("");
      expect($head.eq(1)).to.contain("");
      expect($head.eq(2)).to.contain("");
    });

    cy.get("[data-testid=tail]").within(($tail) => {
      expect($tail.eq(0)).to.contain("");
      expect($tail.eq(1)).to.contain("");
      expect($tail.eq(2)).to.contain("");
    });

    cy.get("[data-testid=index]").each(($el, index) => {
      expect($el).to.contain(index);
    });

    cy.get("[data-testid=circle]").each(($list) => {
      expect($list).to.contain("");
    });
  });

  it('should remove button works correctly', function () {
      cy.get('input').should('be.empty');
      cy.get('input').type(firstElement);
      cy.get('[data-testid=addBtn]').click();
      cy.wait(SHORT_DELAY_IN_MS);

      cy.get('input').should('be.empty');
      cy.get('input').type(secondElement);
      cy.get('[data-testid=addBtn]').click();
      cy.wait(SHORT_DELAY_IN_MS);

      cy.get('input').should('be.empty');
      cy.get('input').type(thirdElement);
      cy.get('[data-testid=addBtn]').click();
      cy.wait(SHORT_DELAY_IN_MS);

      cy.get('[data-testid=removeBtn]').click();

      cy.get("[data-testid=circle]").each(($list) => {
        expect($list).to.contain("");
      });
  });
});