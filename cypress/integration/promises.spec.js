it('Sem teste', ()=>{
})

//Callback significa não querer mais um retorno
//E sim que a função que receber no parametro, seja executada
/*const getSomething = (callback) => {
    setTimeout(() => {
        callback(10);
    }, 1000)
}*/

/*const system = () => {
    console.log('init');
    getSomething(some => {
        console.log(`Something is ${some}`);
        console.log('end');
    })
}*/

//Usando PROMISE
const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(10);
        }, 1000)
    })
}

//Usando PROMISE
const system = () => {
    console.log('init');
    getSomething().then(some => {
        console.log(`Something is ${some}`);
    })
    console.log('end');
}

//USANDO SINCRONOMO - não usado no Cypress
/*const system = async () => {
    console.log('init');
    const some = await getSomething();
    console.log(`Something is ${some}`);
    console.log('end');
}*/

system();