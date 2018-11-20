const cards = (state = {
    allCards: [],
    filteredCards: [],
    card: {
        id: '',
        stage_id: '',
        text: '',
        type: '',
    }
}, action) => {
    switch (action.type) {
        case 'SET_CARDS':
            return {
                ...state,
                allCards: action.payload
            };
        case 'FILTER_CARDS':
            return {
                ...state,
                filteredCards: state.allCards.filter(card => card.stage_id === Number(action.payload))
            };
        case 'SET_SPECIFIC_CARD':
            return {
                ...state,
                card: {
                    id:action.payload.id,
                    stage_id:action.payload.stage_id,
                    text:action.payload.text,
                    type:action.payload.type
                }
            }
        default:
            return state;
    }
}




export default cards;