
/// <reference types = "cypress" />

describe('Esperas...', () => {

    before(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html");
    })

    beforeEach(() => {
        cy.reload;
    })

    it("Deve aguardar elemento estar disponivel", () => {
        //Garantindo que a tag não existe
        cy.get('#novoCampo').should('not.exist');
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo').should('not.exist');
        //Assert espera existir a tag
        cy.get('#novoCampo').should('exist');
        cy.get('#novoCampo').type('funciona');
    })

    it("Deve fazer retrys (Retentativas)", () => {
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo')
            .should('exist')
            .type('funciona');
    })

    it('Uso do find', () => {
        cy.get('#buttonList').click();
        
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1');
        //Find não funciona no exemplo abaixo
        /*cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 2');*/
        
        cy.get('#lista li span').should('contain', 'Item 2');
    })

    it.only('Uso do timeout', () => {
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo', { timeout: 1000 }).should('exist');
    })

})