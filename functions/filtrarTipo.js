function filtrarTipo(cards, selectedType) {
    return cards.filter(
        (card) => card.type?.toLowerCase() === selectedType.toLowerCase()
    );
}

module.exports = filtrarTipo;