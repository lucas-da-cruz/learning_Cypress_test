/// <reference types = "cypress" />

describe('Should test at a functional level', () => {
    let token;

    before(() => {
        cy.getToken('lucas@lucastest.com', '1234')
        .then(tkn => {
            token = tkn
        })
    })

    beforeEach(() => {
        cy.resetRest();
    })

    it('Should create an account', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: {Authorization: `JWT ${token}`},
            body: {
                nome: "Conta via REST"
            }
        }).as('response');

        //Espera minha requisição response terminar para validar
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('nome', 'Conta via REST');
        })
    })

    it('Should update an account', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: {Authorization: `JWT ${token}`},
            //Adicionando atributo no link
            qr: {
                nome: 'Conta para alterar'
            }
        }).then(res => {

            cy.request({
                method: 'PUT',
                url: `/contas/${res.body[0].id}`,
                headers: {Authorization: `JWT ${token}`},
                body: {
                    nome: 'Conta via REST'
                }
            }).as('response');
            
        })

        cy.get('@response').its('status').should('be.equal', 200);
    })
    

})