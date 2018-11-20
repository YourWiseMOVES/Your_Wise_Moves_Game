const cards = (state = { originalCards: [], cards: [] }, action) => {
    switch (action.type) {
        case 'SET_CARDS':
            return { originalCards: action.payload, cards: action.payload };
        case 'CLEAR_CARD_FILTER':
            return { ...state, cards: state.originalCards };
        case 'FILTER_CARDS_BY_CATEGORY':
            return { ...state, cards: state.originalCards.filter(card => card.stage_id === Number(action.payload)) }
        case 'FILTER_CARDS_BY_DECK':
            return { ...state, cards: action.payload }
        default:
            return state;
    }
}




export default cards;