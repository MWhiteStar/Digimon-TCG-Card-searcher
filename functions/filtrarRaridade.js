function filtrarRaridade (cards, selectedRarity){
    return cards.filter(
        (card) => card.rarity?.toLowerCase() === selectedRarity.toLowerCase()
    );
};

module.exports = filtrarRaridade;