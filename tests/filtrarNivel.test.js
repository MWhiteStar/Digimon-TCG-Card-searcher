const filtrarNivel = require('../functions/filtrarNivel');

describe('filtrarNivel', () => {
    const mockCards = [
        {name:'Agumon', level: 3},
        {name:'Greymon', level: 4},
        {name:'MetalGreymon', level: 5},
        {name:'Gabumon', level: 3}
    ];

    it('Deve retornar somente cartas de level 4', () => {
        const result = filtrarNivel(mockCards, 4);
        expect(result).toEqual([{name:'Greymon', level: 4}]

        );
    });

    it('Deve retornar um Array vazio se nenhuma carta tiver o level especificado', () => {
        const result = filtrarNivel(mockCards, 6);
        expect(result).toEqual([]);
    });
})