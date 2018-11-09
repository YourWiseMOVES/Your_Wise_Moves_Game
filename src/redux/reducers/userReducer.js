import { combineReducers } from 'redux';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

const userTypeReducer = (state = {userType: ''}, action) => {
  switch (action.type) {
    case 'SET_USER_TYPE':
      return action.payload;
    default:
      return state;
  }
}

// user will be on the redux state at:
// state.user

export default combineReducers({
  userReducer,
  userTypeReducer,
});
