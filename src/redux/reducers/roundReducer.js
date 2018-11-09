import { combineReducers } from 'redux';

//Sets game round
const setGameRound = (state = 1, action) => {
  switch (action.type) {
    case 'PROCEED_TO_NEXT_ROUND':
      return state + 1 ;
    default:
      return state;
  }
};


// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
    setGameRound,
});