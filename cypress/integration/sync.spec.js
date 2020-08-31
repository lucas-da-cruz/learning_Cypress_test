
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

    it.only("Deve fazer retrys (Retentativas)", () => {
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo')
            .should('exist')
            .type('funciona');
    })
})