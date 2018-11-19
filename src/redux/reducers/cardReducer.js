const cards = (state = {allCards:[], filteredCards:[]}, action) => {
    switch(action.type) {
        case 'SET_CARDS':
            return {...state, allCards:action.payload};
            case 'FILTER_CARDS':
            return {...state, filteredCards: state.allCards.filter(card => card.stage_id == action.payload)}
        default:
            return state;
    }
}




export default cards;