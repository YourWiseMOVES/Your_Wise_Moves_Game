import { combineReducers } from 'redux';

const cardReducer = (state = {
    id: '',
    text: '',
    stage_id: '',
}, action) => {
    switch (action.type) {
        case 'FIRST_ACTION':
            return '';
        default:
            return state;
    }
};

const deckReducer = (state = {
    id: '',
    description: '',
    cards_in_deck: '',
}, action) => {
    switch (action.type) {
        case 'FIRST_ACTION':
            return '';
        default:
            return state;
    }
};

const discussion_phaseReducer = (state = {
    id: '',
    player_1: '',
    player_2: '',
    player_3: '',
    player_4: '',
    player_5: '',
}, action) => {
    switch (action.type) {
        case 'FIRST_ACTION':
            return '';
        default:
            return state;
    }
};

const gameReducer = (state = {
    id: '',
    facilitator_id: '',
    time_started: '',
    current_player_number: '',
}, action) => {
    switch (action.type) {
        case 'FIRST_ACTION':
            return '';
        default:
            return state;
    }
};

const game_stateReducer = (state = {
    id: '',
    game_id: '',
    discussion_phase_id: '',
    game_state: {round: 1, stage: 0},
}, action) => {
    switch (action.type) {
        case 'PROCEED_TO_NEXT_ROUND':
            return {
                ...state,
                game_state: {round: state.game_state.round + 1, stage: 0}
            };
        default:
            return state;
    }
};

const journalReducer = (state = {
    id: '',
    intention: '',
    question_one: '',
    question_two: '',
    question_three: '',
    question_four: '',
    question_five: '',
    response_one: '',
    response_two: '',
    response_three: '',
    response_four: '',
    response_five: '',
    game_id: '',
}, action) => {
    switch (action.type) {
        case 'FIRST_ACTION':
            return '';
        default:
            return state;
    }
};

const personReducer = (state = {
    id: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    organization: '',
    phone_number: '',
    is_facilitator: '',
    is_admin: '',
}, action) => {
    switch (action.type) {
        case 'FIRST_ACTION':
            return '';
        default:
            return state;
    }
};

const playerReducer = (state = {
    id: '',
    name: '',
    journal_id: '',
    game_id: '',
    player_number: '',
}, action) => {
    switch (action.type) {
        case 'FIRST_ACTION':
            return '';
        default:
            return state;
    }
};

const stage_typeReducer = (state = {
    id: '',
    type: '',
}, action) => {
    switch (action.type) {
        case 'FIRST_ACTION':
            return '';
        default:
            return state;
    }
};

export default combineReducers({
    cardReducer,
    deckReducer,
    discussion_phaseReducer,
    gameReducer,
    game_stateReducer,
    journalReducer,
    personReducer,
    playerReducer,
    stage_typeReducer
});
