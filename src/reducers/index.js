import { combineReducers } from 'redux';
import contacts from './contacts';
import request from './request';

export default combineReducers({
    contacts,
    request
});