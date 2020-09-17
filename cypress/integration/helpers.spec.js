/// <reference types = "cypress" />

describe('Helpers', () => {
    it('Wrap', () => {
        const obj = {nome: 'User', idade: 16}

        expect(obj).to.have.property('nome');
        cy.wrap(obj).should('have.property', 'nome');

        cy.visit("https://wcaquino.me/cypress/componentes.html");

        cy.get('#formNome').then($el => {
            //Via JQUERY
            //$el.val('eee')
            //Por meio do WRAP
            cy.wrap($el).type('Funciona');
        })
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })
        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botao'));
       // promise.then(num => console.log(num))
       cy.wrap(promise).then(ret => console.log(ret));
       cy.get('#buttonList').then(() => console.log('Encontrei o segundo botao'));
       
        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2)
    })

    it.only('Its', () => {
        const obj = {nome: 'User', idade: 16}
        //cy.wrap(obj).should('have.property', 'nome', 'User');
        //Só quero a propriedade nome
        cy.wrap(obj).its('nome').should('be.equal', 'User');
    
        const obj2 = {nome: 'User', idade: 16, endereco:{rua: 'do'}}
        cy.wrap(obj2).its('endereco').should('have.property', 'rua');
        //Encadeado
        cy.wrap(obj2).its('endereco.rua').should('contain', 'do');

        cy.visit("https://wcaquino.me/cypress/componentes.html");
        cy.title().its('length').should('be.equal', 20);
    })
})