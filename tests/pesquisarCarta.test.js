const pesquisarCarta = require('../functions/pesquisarCarta');

describe('pesquisarCarta', () => {
    const mockCards=[
        {name: 'Agumon'},
        {name: 'Greymon'},
        {name: 'Gabumon'},
        {name: 'Garurumon'}
    ];

    it('deve retornar cartas que possuem o termo pesquisado', () => {
        const resultado = pesquisarCarta(mockCards, 'mon');
        expect(resultado).toEqual([
        {name: 'Agumon'},
        {name: 'Greymon'},
        {name: 'Gabumon'},
        {name: 'Garurumon'}
        ]);
    });

    it('Deve retornar um array vazio se nenhuma carta que corresponder ao que foi pesquisado', () => {
        const resultado = pesquisarCarta(mockCards, 'Patamon');
        expect(resultado).toEqual([]);
    });

    it('Deve retornar todas as cartas se nada for digitado no momento da pesquisa', () => {
        const resultado = pesquisarCarta(mockCards, '');
        expect(resultado).toEqual(mockCards);
    });
});