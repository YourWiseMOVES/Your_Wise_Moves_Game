class Deck {
    /*
    this class constructor takes in an array of cards objects
    with stage_id properties for filtering
    */
    constructor(arrayOfCardsInDeck) {
        this.initialCards = arrayOfCardsInDeck //collection
        this.cards = arrayOfCardsInDeck.map(card=>card) //current selected cards
        this.drawnCards = [] //cards already drawn
        this.selectedCard = {} //currently selected card
    }
    //subSelect is for narrowing the current cards down to cards of one type
    subSelect(stage_id) {
        if(!stage_id){
            throw new Error('No stage_id argument given')
        }
        let subSelection = []
        for (let card of this.cards) {
            if (card.stage_id === stage_id) {
                subSelection.push(card)
            } else {
                this.drawnCards.push(card)
            }
        }
        this.cards = subSelection;
        return subSelection
    }

    //shuffle cards (for fun)
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        return this.cards
    }

    //get a random card
    draw(){
        this.selectedCard = this.cards.pop()
        this.drawnCards.push(this.selectedCard)
        return this.selectedCard
    }

    //set the deck back to its initial state
    reset(){
        this.cards = this.initialCards
        this.drawnCards = []
        this.selectedCard = {}
        return this
    }
}

//export Deck for use in deal handler
module.exports = Deck;