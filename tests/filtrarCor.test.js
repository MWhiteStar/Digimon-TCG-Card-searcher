const filtrarCor = require('../functions/filtrarCor');

describe('filtrarCor', () => {
    const mockCards = [
        {name:'Agumon', color:'Red'},
        {name:'Gabumon', color: 'Blue'},
        {name:'Palmon', color:'Green'},
        {name:'Biyomon', color:'Red'}
    ];

    it('Deve retornar somente cartas vermelhas', () => {
        const result = filtrarCor(mockCards, 'Red');
        expect(result).toEqual([{name:'Agumon', color:'Red'}, {name:'Biyomon', color:'Red'}]

        );
    });

    it('Deve retornar um array vazio se nenhuma carta tiver a cor especificada', () => {
        const result = filtrarCor(mockCards, 'Black');
        expect(result).toEqual([]);  
    });

    it('Deve funcionar mesmo se o filtro estiver em letras minusculas', () => {
        const result = filtrarCor(mockCards, 'red');
        expect(result).toEqual([{name:'Agumon', color:'Red'}, {name:'Biyomon', color:'Red'}]

        );
    });

});