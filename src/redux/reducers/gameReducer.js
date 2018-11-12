import { combineReducers } from 'redux';

const discussionPhase = (state = {id: '', player_1: false, player_2: false, player_3: false, player_4: false, player_5: false}, action) => {
    switch (action.type) {
        case 'UPDATE_DISCUSSION_PHASE':
            let propName = `player_${action.payload.playerNumber}`
            return {
                ...state,
                [propName]: action.payload.setTo,
            };
        default:
            return state;
    }
};

const gameInfo = (state = {id: '', facilitator_id: '', time_started: ''}, action) => {
    switch (action.type) {
        case 'SET_GAME':
            return action.payload;
        default:
            return state;
    }
};

const gameState = (state =  '00', action) => {
    switch (action.type) {
        case 'UPDATE_GAME_STATE':
            return action.payload.newGameState;
        default:
            return state;
    }
};



const journal = (state = {intention: '', question_one: '', question_two: '', question_three: '', question_four: '', question_five: '', response_one: '', response_two: '', response_three: '', response_four: '', response_five: '' }, action) => {
    switch (action.type) {
        case 'UPDATE_JOURNAL_QUESTION':
            let question = `question_${action.payload.roundNumber}`;
            let response = `question_${action.payload.roundNumber}`;
            return {
                ...state,
                [question]: action.payload.question,
                [response]: action.payload.response,
            };
        case 'UPDATE_JOURNAL_INTENTION':
            return {
                ...state,
                intention: action.payload.intention,
            }
        default:
            return state;
    }
};

const player = (state = {id: '', name: '', journal_id: '', game_id: '', player_number: ''}, action) => {
    switch (action.type) {
        case 'SET_PLAYER':
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};

const allPlayers = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_PLAYERS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    gameInfo,
    gameState,
    player,
    discussionPhase,
    journal,
    allPlayers,
});
