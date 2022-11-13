import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('fibonacci page display correctly', function () {
    before(function () {
        cy.visit('http://localhost:3000/fibonacci');
    });

    it('should button disabled if input is empty', function () {
        cy.get('input').should('be.empty');
        cy.get('button').should('be.disabled');
    });

    it('should fibonacci numbers render correctly', function () {
        const numberForFibonacci = 5;
        const fibonacciArr = [1, 1, 2, 3, 5, 8];
        const color = 'rgb(0, 50, 255)';

        cy.get('input').type(numberForFibonacci);
        cy.get('button').should('not.be.disabled');
        cy.get("button[type='submit']").click();

        cy.get('[data-testid=circle]').each(($el, index) => {
            expect($el).to.contain(fibonacciArr[index]);
            cy.get($el).should('have.css', 'border-color', color);
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[data-testid=circle]').each(($el, index) => {
            expect($el).to.contain(fibonacciArr[index]);
            cy.get($el).should('have.css', 'border-color', color);
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[data-testid=circle]').each(($el, index) => {
            expect($el).to.contain(fibonacciArr[index]);
            cy.get($el).should('have.css', 'border-color', color);
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[data-testid=circle]').each(($el, index) => {
            expect($el).to.contain(fibonacciArr[index]);
            cy.get($el).should('have.css', 'border-color', color);
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[data-testid=circle]').each(($el, index) => {
            expect($el).to.contain(fibonacciArr[index]);
            cy.get($el).should('have.css', 'border-color', color);
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[data-testid=circle]').each(($el, index) => {
            expect($el).to.contain(fibonacciArr[index]);
            cy.get($el).should('have.css', 'border-color', color);
        });

        cy.wait(SHORT_DELAY_IN_MS);
    });
});