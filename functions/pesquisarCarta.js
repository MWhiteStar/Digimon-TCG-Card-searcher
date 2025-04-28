function pesquisarCarta(cards, termo) {
    return cards.filter(card => 
        card.name.toLowerCase().includes(termo.toLowerCase())
    );
}

module.exports = pesquisarCarta;