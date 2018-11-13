//case/switch on action.type call a seperate function depending of the type it is

//function receives actions and routes them to their proper handlers
const receiver = (action) => {
    switch(action.type) {
        case ('advance'):
            return(advance(action));
        case ('discussion'):
            return(discussion(action));
        case ('journal'):
            return(journal(action));
        case ('join'):
            return(join(action));
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
        type: 'UPDATE_JOURNAL_QUESTION',
        payload: {    
            question: action.data.question,
            response: action.data.response,
            roundNumber: action.data.roundNumber,
            playerId: action.data.playerId,
        }
    }
    return reduxAction;
}

const join = action => {
    const reduxAction = {
        type: 'SET_PLAYER',
        payload: {    
            ...action.data,
        }
    }
    return reduxAction;
}

const discussion = action => {
    const reduxAction = {
        type: 'UPDATE_DISCUSSION_PHASE',
        payload: {    
            playerNumber: action.data.playerNumber,
            setTo: action.data.setTo,
        }
    }
    return reduxAction;
}





export default receiver;