const selectedGame = (state = {}, action) => {
    switch(action.type) {
        case 'SELECT_GAME':
            return action.payload;
        case 'CLEAR_SELECT_GAME':
            return {};
        default:
            return state;
    }
}


export default selectedGame;