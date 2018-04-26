import {combineReducers} from 'redux';

import home from 'reducers/home';
import register from 'reducers/register';
import login from 'reducers/login';


export default combineReducers({
    home,
    register,
    login
});