import { put, takeLatest, all } from 'redux-saga/effects';
import {Actions, loginSuccess, login} from '../actions';


function* loginSaga(action: ReturnType<typeof login>) {
    const json = yield fetch('localhost:3000/login', {method: 'POST'})
        .then(response => response.json());
    yield put<Actions>(loginSuccess());
}
function* actionWatcher() {
    yield takeLatest('LOGIN_REQUESTED', loginSaga)
}
export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}