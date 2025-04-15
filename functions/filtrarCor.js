function filtrarCor(cards, selectedColor){
    return cards.filter(
        (card) => card.color?.toLowerCase() === selectedColor.toLowerCase()
    );
};

module.exports = filtrarCor;