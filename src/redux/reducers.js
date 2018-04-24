import {combineReducers} from 'redux';

import home from 'reducers/home';
import register from 'reducers/register';


export default combineReducers({
    home,
    register
});