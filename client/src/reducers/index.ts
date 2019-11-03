import loggedInUser from './loggedInUser';
import AppState from '../models/AppState';
import { combineReducers } from 'redux';

export default combineReducers<AppState>({
    loggedInUser,
});