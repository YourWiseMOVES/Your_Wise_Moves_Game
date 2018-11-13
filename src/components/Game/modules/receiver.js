//case/switch on action.type call a seperate function depending of the type it is

//function receives actions and routes them to their proper handlers
const receiver = (action) => {
    switch (action.type) {
        case ('advance'):
            return (advance(action));
        case ('discussion'):
            return (discussion(action));
        case ('journal'):
            return (journal(action));
        case ('join'):
            return (join(action));
    }
}

const advance = action => {
    const reduxAction = {
        type: 'UPDATE_GAME_STATE',
        payload: {
            newGameState: action.data.newGameState,
            fetchPlayers: action.data.resetDiscussion,
        }
    }
    return reduxAction;
}

const journal = action => {
    let reduxAction;
    if (action.intention) {
        reduxAction = {
            type: 'UPDATE_INTENTION',
            payload: {
                intention: action.data.intention,
            }
        }
    }
    else {
        reduxAction = {
            type: 'UPDATE_JOURNAL_QUESTION',
            payload: {
                question: action.data.question,
                response: action.data.response,
                roundNumber: action.data.roundNumber,
                playerId: action.data.playerId,
            }
        }
    }
    return reduxAction;
}

const join = action => {
    const actions = []
    const reduxActionOne = {
        type: 'SET_PLAYER',
        payload: {
            ...action.data,
        }
    }
    actions.push(reduxActionOne);
    const reduxActionTwo = {
        type: 'SET_GAME',
        payload: action.game
    }
    actions.push(reduxActionTwo);
    return actions;
}

const discussion = action => {
    const reduxAction = {
        type: 'SET_SELECTED_PLAYER',
        payload: {
            player: action.data.player,
        }
    }
    return reduxAction;
}





export default receiver;