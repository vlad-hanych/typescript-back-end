import { put, takeLatest, all } from 'redux-saga/effects';
import {loginSuccess, login, register, ActionTypes} from '../actions';

function* loginSaga(action: ReturnType<typeof login>) {
    const payload = {username: action.email, password: action.password}
    const json = yield fetch('/login', {method: 'POST',  headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },body: JSON.stringify(payload)})
        .then(response => response.json());
    yield put(loginSuccess());
}

function* registerSaga(action: ReturnType<typeof register>){
    const payload = {username: action.email, password: action.password}
    const json = yield fetch('/signup', {method: 'POST',  headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },body: JSON.stringify(payload)})
        .then(response => response.json());
    yield put(loginSuccess());
}

export default function* rootSaga() {
    yield all([
        yield takeLatest(ActionTypes.LoginRequested, loginSaga),
        yield takeLatest(ActionTypes.RegisterUser, registerSaga)
    ]);
}