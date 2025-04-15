const filtrarTipo = require('../functions/filtrarTipo');

describe('filtrarTipo', () => {
    const mockCards = [
        {name: 'Agumon', type: 'Digimon'},
        {name: 'Greymon', type: 'Digimon'},
        {name: 'Gaia Force', type: 'Option'},
        {name: 'Tai Kamiya', type: 'Tamer'}
    ];

    it('Deve retornar somente cartas do tipo Digimon.', () => {
        const result = filtrarTipo(mockCards, 'Digimon');
        expect(result).toEqual([
            {name: 'Agumon', type: 'Digimon'},
            {name: 'Greymon', type: 'Digimon'}
        ]);
    });

    it('Deve funcionar com letras Minusculas.', () => {
        const result = filtrarTipo(mockCards, 'option');
        expect(result).toEqual([
            {name: 'Gaia Force', type: 'Option'}
        ]);
    });

    it('Deve retornar um array vazio se não houver nenhuma carta do tipo especificado.', () => {
        const result = filtrarTipo(mockCards, 'Egg')
        expect(result).toEqual([]); 
    })
})