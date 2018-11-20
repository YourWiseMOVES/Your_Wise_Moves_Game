const cards = (state = { allCards: [], filteredCards: [] }, action) => {
    switch (action.type) {
        case 'SET_CARDS':
            return { allCards: action.payload, filteredCards: action.payload };
        case 'CLEAR_CARD_FILTER':
            return { ...state, filteredCards: state.allCards };
        case 'FILTER_CARDS_BY_CATEGORY':
            return { ...state, filteredCards: state.allCards.filter(card => card.stage_id === Number(action.payload)) }
        default:
            return state;
    }
}




export default cards;