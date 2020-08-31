/// <reference types = "cypress" />

describe('Should test at a service level', () => {
    //let token;

    before(() => {
        cy.getToken('lucas@lucastest.com', '1234')
        /*.then(tkn => {
            token = tkn
        })*/
    })

    beforeEach(() => {
        cy.resetRest();
    })

    it('Should create an account', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            //headers: {Authorization: `JWT ${token}`},
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
        cy.getContaByName('Conta para alterar')
        .then(contaId => {

            cy.request({
                method: 'PUT',
                url: `/contas/${contaId}`,
                //headers: {Authorization: `JWT ${token}`},
                body: {
                    nome: 'Conta via REST'
                }
            }).as('response');

        })

        cy.get('@response').its('status').should('be.equal', 200);
    })

    it('Should not create an account with same name', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            //headers: {Authorization: `JWT ${token}`},
            body: {
                nome: "Conta mesmo nome"
            },
            //Abaixo definimos que quando um status code 2xx ou 4xx
            // o cypress não vai considerar erro
            failOnStatusCode: false
        }).as('response');

        //Espera minha requisição response terminar para validar
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!');
        })
    })

    it('Should create a transaction', () => {
        cy.getContaByName('Conta para movimentacoes')
        .then(contaId => {
            cy.request({
                method: 'POST',
                url: '/transacoes',
                //headers: {Authorization: `JWT ${token}`},
                body: {
                    conta_id: contaId,
                    //data_pagamento: "21/11/2019",
                    data_pagamento: Cypress.moment().add({days:1}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: "desc",
                    envolvido: "inter",
                    status: true,
                    tipo: "REC",
                    valor: "123",
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 201);
        cy.get('@response').its('body.id').should('exist');
    })

    it('Should get balance', () => {
        cy.request({
            url: '/saldo',
            method: 'GET',
            //headers: {Authorization: `JWT ${token}`}
        }).then(res => {
            let saldoConta = null;
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo'){
                    saldoConta = c.saldo;
                }
            })
            expect(saldoConta).to.be.equal('534.00');
        });

        cy.request({
            url: '/transacoes',
            method: 'GET',
            //headers: {Authorization: `JWT ${token}`},
            qs: {descricao: 'Movimentacao 1, calculo saldo'}
        }).then (res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                //headers: {Authorization: `JWT ${token}`},
                body: {
                    conta_id: res.body[0].conta_id,
                    //data_pagamento: "21/11/2019",
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    status: true,
                    valor: res.body[0].valor,
                }
            }).its('status').should('be.equal', 200) 
        })

        cy.request({
            url: '/saldo',
            method: 'GET',
            //headers: {Authorization: `JWT ${token}`}
        }).then(res => {
            let saldoConta = null;
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo'){
                    saldoConta = c.saldo;
                }
            })
            expect(saldoConta).to.be.equal('4034.00');
        });
    })

    it('Should remove a transaction', () => {
        cy.request({
            url: '/transacoes',
            method: 'GET',
            //headers: {Authorization: `JWT ${token}`},
            qs: {descricao: 'Movimentacao para exclusao'}
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                //headers: {Authorization: `JWT ${token}`},
            }).its('status').should('be.equal', 204)
        })
    })
})