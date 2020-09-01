/// <reference types = "cypress" />

describe('Should test at a functional level', () => {

    before(() => {
        cy.visit('https://barrigareact.wcaquino.me');
        cy.get('.input-group > .form-control').type('lucas@lucastest.com');
        cy.get('[data-test=passwd]').type('1234');
        cy.get('.btn').click();
        cy.get('.toast-message').should('contain', 'Bem vindo');
    });

    after(() => {
        cy.get('[data-test=menu-settings]').click();
        cy.get('[href="/logout"]').click();
    })

    it('Should create an account', () => {
        cy.get('[data-test=menu-settings]').click();
        cy.get('[href="/contas"]').click();
        cy.get('[data-test=nome]').type('Conta de teste');
        cy.get('.btn').click();
        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso');
    })

})
