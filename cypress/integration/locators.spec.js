/// <reference types = "cypress" />

describe('Work with locators', () => {

    //before -> realizar uma vez antes de todos metodos
    before(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html");
    })

    //Executa todas as vezes para antes de todos os testes
    beforeEach(() => {
        cy.reload;
    })

    /*it('...', () => {

    })*/

    it.only('Using xpath', () => {
        cy.xpath('//input')
    })
})