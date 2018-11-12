//case/switch on action.type call a seperate function depending of the type it is

//function receives actions and routes them to their proper handlers
const receiver = (action) => {
    switch(action.type) {
        case ('advance'):
            advance(action);
            break;
        case ('discussion'):
            discussion(action);
            break;
        case ('journal'):
            journal(action);
            break;
        case ('join'):
            join(action);
            break;
    }
}

const advance = action => {
    const reduxAction = {
        type: 'UPDATE_GAME_STATE',
        payload: {    
            newGameState: action.data.newGameState,
        }
    }
    return reduxAction;
}

const journal = action => {
    const reduxAction = {
        type: 'UPDATE_GAME_STATE',
        payload: {    
            newGameState: action.data.newGameState,
        }
    }
    return reduxAction;
}

const join = action => {
    const reduxAction = {
        type: 'UPDATE_GAME_STATE',
        payload: {    
            newGameState: action.data.newGameState,
        }
    }
    return reduxAction;
}

const discussion = action => {
    const reduxAction = {
        type: 'UPDATE_GAME_STATE',
        payload: {    
            newGameState: action.data.newGameState,
        }
    }
    return reduxAction;
}





export default receiver;