const filtrarRaridade = require('../functions/filtrarRaridade');

describe('filtrarRaridade' , () => {
    const mockCards = [
        {name:'Agumon', rarity: 'C'},
        {name: 'Greymon', rarity: 'R'},
        {name:'Wargreymon', rarity: 'SR'},
        {name:'Garurumon', rarity: 'R'},
        {name:'MetalGarurumon', rarity: 'SR'}
    ];

    it('deve retornar apenas cartas com a raridade SR', () => {
        const result = filtrarRaridade(mockCards, 'SR');
        expect(result).toEqual([{name:'Wargreymon', rarity: 'SR'}, {name:'MetalGarurumon', rarity: 'SR'}]

        );
    });
    it('Deve retornar um Array vazio se nenhuma carta tiver a raridade especificada', () => {
        const result = filtrarRaridade(mockCards, 'SEC');
        expect(result).toEqual([]);
    });

    it('deve funcionar mesmo se o filtro for em letra minuscula', () => {
        const result = filtrarRaridade(mockCards, 'sr');
        expect(result).toEqual([
             {name:'Wargreymon', rarity: 'SR'},
             {name:'MetalGarurumon', rarity: 'SR'}
            ])
    });
});

