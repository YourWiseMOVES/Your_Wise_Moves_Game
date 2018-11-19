const deck = (state = {
    decks: [],
    selectedDeck: {
        description: 'no selected deck',
        cards: []
    }
}, action) => {
    switch (action.type) {
        case 'SET_DECKS':
            return {
                ...state,
                decks: action.payload
            };
        case 'SET_SELECTED_DECK':
            return {
                ...state,
                selectedDeck: action.payload
            }
        default:
            return state;
    }
}




export default deck;