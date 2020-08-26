it('nada por agora', function(){ })

/*function soma(a, b){
    return a + b;
}*/

//Function anonima
/*const soma = function(a, b){
    return a + b;
}*/

//Arrow function
const soma = (a, b) => {
    return a + b;
}

//Return implicito, sem chaves
//const soma = (a, b) => a + b;

//Arrow function com um parametro só,
//sem parenteses
//const soma = a => a + a;

console.log(soma(1, 4));

//This retorna o contexto da function
it('a function test...', function(){
    console.log('Function', this);
})

//This não retorna o contexto da arrow function
it('An arrow test...', () => {
    console.log('Arrow', this);
})