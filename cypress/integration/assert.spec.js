/// <reference types = "cypress" />


it("Equality", () => {
    const a = 1;

    expect(a).equal(1);
    //expect(a).to.be.equal(1);
    expect(a, "Deveria ser 1").equal(1);
    expect('a').not.equal('b');
    //expect('a').not.to.be.equal('b');
})

it("Truthy", () => {
    const a = true;
    const b = null;
    let c;

    expect(a).true;
    expect(a).not.to.be.null;
    expect(a).not.null;
    expect(b).null;
    expect(c).undefined;
})

it("Object equality", () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).equal(obj);

    //Precisa ter o deep para comparar objetos ou eql
    expect(obj).deep.equal({a: 1, b: 2});
    expect(obj).eql({a: 1, b: 2});

    //Verifica se o objeto contém alguma propriedade especifica
    expect(obj).include({a: 1});

    //Verifica se o objeto tem a propriedade especifica
    expect(obj).to.have.property('b');
    expect(obj).to.have.property('b', 2);
    expect(obj).to.not.be.empty;
    expect({}).to.be.empty;
})

it('Arrays', () => {
    const arr = [1, 2, 3];

    expect(arr).to.have.members([1, 2, 3]);
    expect(arr).to.include.members([1, 2]);
    expect(arr).to.not.be.empty;
    expect([]).to.be.empty;
})

it('Types', () => {
    const num = 1;
    const str = "String";

    expect(num).to.be.a('number');
    expect(str).to.be.a('string');
    expect([]).to.be.a('array');
    expect({}).to.be.a('object');
})

it('String', () => {
    const str = "String de teste";

    expect(str).to.be.equal("String de teste");
    expect(str).to.have.length(15);
    expect(str).to.match(/.{15}/);
    expect(str).to.contains('de');
    expect(str).to.match(/de/);
    //Deve iniciar
    expect(str).to.match(/^String/);
    //Deve terminar
    expect(str).to.match(/teste$/);
    //apenas palavras
    expect(str).to.match(/\w+/);
    //Não contem numeros
    expect(str).to.match(/\D+/);  
})

it('Number', () => {
    const number = 4;
    const floatNumber = 5.1234;

    expect(number).equal(4);
    //Acima
    expect(number).to.be.above(3);
    //Abaixo
    expect(number).to.be.below(7);

    expect(floatNumber).equal(5.1234);
    //proximo, para dizimas periodicas (numero, precisao)
    expect(floatNumber).closeTo(5.1, 0.1);
})