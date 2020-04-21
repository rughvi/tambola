import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import ticketsReducer from './ticketsReducer';
import numbersRolledReducer from './numbersRolledReducer';

export default combineReducers({
    loginReducer,
    ticketsReducer,
    numbersRolledReducer
});