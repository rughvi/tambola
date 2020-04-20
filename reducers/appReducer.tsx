import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import ticketsReducer from './ticketsReducer';

export default combineReducers({
    loginReducer,
    ticketsReducer
});