import axios from 'axios';
import { put, takeLatest, call, actionChannel } from 'redux-saga/effects';

function* fetchPlayers(action) {
  try {
    const response = yield call(axios, {method: 'GET', url: '/game/players', params: {id: action.payload}})
    yield put({ type: 'SET_ALL_PLAYERS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* playersSaga() {
  yield takeLatest('FETCH_PLAYERS', fetchPlayers);
}

export default playersSaga;