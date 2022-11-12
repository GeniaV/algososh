import { DELAY_IN_MS } from "../../src/constants/delays";

describe('string page display correctly', function () {
    before(function () {
        cy.visit('http://localhost:3000/recursion');
    });

    it('should button disabled if input is empty', function () {
        cy.get('input').should('be.empty');
        cy.get('button').should('be.disabled');
    });

    it('srting should reverse correctly', function () {
        const stringLength = 5;

        const originalString = 'hello';
        const firstStepColorsArr = ['rgb(210, 82, 225)', 'rgb(0, 50, 255)', 'rgb(0, 50, 255)', 'rgb(0, 50, 255)', 'rgb(210, 82, 225)'];

        const inProcessString = 'oellh';
        const secondStepColorsArr = ['rgb(127, 224, 81)', 'rgb(210, 82, 225)', 'rgb(0, 50, 255)', 'rgb(210, 82, 225)', 'rgb(127, 224, 81)'];
        
        const finalString = 'olleh';
        const finaStepColorsArr = ['rgb(127, 224, 81)', 'rgb(127, 224, 81)', 'rgb(127, 224, 81)', 'rgb(127, 224, 81)', 'rgb(127, 224, 81)'];

        cy.clock();

        cy.get('input').type(originalString);
        cy.get('button').should('not.be.disabled');
        cy.get("button[type='submit']").click();

        cy.get('[data-testid=circle]').each(($el: string, index: number, $list: string[]) => {
            expect($list).to.have.length(stringLength)
            expect($el).to.contain(originalString[index]);
            cy.get($el).should('have.css', 'border-color', firstStepColorsArr[index]);
        })

        cy.tick(DELAY_IN_MS);

        cy.get('[data-testid=circle]').each(($el: string, index: number, $list: string[]) => {
            expect($list).to.have.length(stringLength)
            expect($el).to.contain(inProcessString[index]);
            cy.get($el).should('have.css', 'border-color', secondStepColorsArr[index]);
        })

        cy.tick(DELAY_IN_MS);

        cy.get('[data-testid=circle]').each(($el: string, index: number, $list: string[]) => {
            expect($list).to.have.length(stringLength)
            expect($el).to.contain(finalString[index]);
            cy.get($el).should('have.css', 'border-color', finaStepColorsArr[index]);
        })
    });
});