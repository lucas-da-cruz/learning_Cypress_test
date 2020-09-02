
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

    it('Uso do timeout', () => {
        //cy.get('#buttonDelay').click();
        //cy.get('#novoCampo', { timeout: 1000 }).should('exist');

        //cy.get('#buttonList').click();
        //é bom evitar o wait fixo e usar o timeout
        //cy.wait(5000);
        //cy.get('#lista li span')
        //    .should('contain', 'Item 2');


        cy.get('#buttonListDOM').click();
        cy.get('#lista li span', {timeout: 30000})
            .should('have.length', 1);
        cy.get('#lista li span', {timeout: 30000})
            .should('have.length', 2);
    })

    it('Reload', () => {
        cy.get('#buttonCount')
            .click()
            .should('have.value', '1')
    })

    it.only('Should vs Then', () => {
        //cy.get('#buttonListDOM').click();
        /**
         * O THEN aguarda a listagem ser gerada para ser executado
         */
        /*cy.get('#lista li span').then($el => {
            expect($el).to.have.length(1)
        })*/
        /**
         * O should realiza a busca e fica fazendo verificação
         */
        /*cy.get('#lista li span').should($el => {
            expect($el).to.have.length(1)
        })*/

        cy.get('#buttonListDOM').then($el => {
            expect($el).to.have.length(1)
        }).and('have.id', 'buttonListDOM')

        //Na array function com o should, eu só posso retorna meu parametro de entrada
        cy.get('#buttonListDOM').then($el => {
            expect($el).to.have.length(1)
            return 2
        }).and('eq', 2).and('not.have.id', 'buttonListDOM')
    })
})