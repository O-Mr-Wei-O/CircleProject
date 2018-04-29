import {combineReducers} from 'redux';

import home from 'reducers/home';
import register from 'reducers/register';
import login from 'reducers/login';
import personalInfo from 'reducers/personalInfo';
import diary from 'reducers/diary';
import circle from 'reducers/circle';


export default combineReducers({
    home,
    register,
    login,
    personalInfo,
    diary,
    circle
});