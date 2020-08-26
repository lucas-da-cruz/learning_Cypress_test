//Diz para o VS que estamos trabalhando
//com cypress
/// <reference types = "cypress" />

//O it diz que temos um teste,
//e o primeiro parametro é a
//descricao do teste
it("A external test...", () => {

})

//Apenas esse teste vai ser executado
/*it.only("A external test...", () => {

})*/

//Crio um grupo de teste
//Posso criar grupos dentro de grupos
describe('Should group test....', () => {
    it("A external test...s", () => {

    })

    it.skip("Usado o skip para ser pulado", () => {

    })
})

describe.skip('"Usado o skip no grupo para ser pulado', () => {
    it("A external test...s", () => {

    })
})