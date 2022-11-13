describe('app works correctly with routes', function() { 
  before(function() {
      cy.visit('http://localhost:3000');
    });
   
    it('should open string-page by link', function() {
      cy.visit('http://localhost:3000/recursion')
    });

    it('should open fibonacci-page by link', function() {
      cy.visit('http://localhost:3000/fibonacci')
    });

    it('should open sorting-page by link', function() {
      cy.visit('http://localhost:3000/sorting')
    });

    it('should open stack-page by link', function() {
      cy.visit('http://localhost:3000/stack')
    });

    it('should open queue-page by link', function() {
      cy.visit('http://localhost:3000/queue')
    });

    it('should open list-page by link', function() {
      cy.visit('http://localhost:3000/list')
    });
  });