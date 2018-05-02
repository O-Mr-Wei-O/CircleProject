import {combineReducers} from 'redux';

import home from 'reducers/home';
import register from 'reducers/register';
import login from 'reducers/login';
import personalInfo from 'reducers/personalInfo';
import diary from 'reducers/diary';
import circle from 'reducers/circle';
import report from 'reducers/report';
import unseal from 'reducers/unseal';


export default combineReducers({
    home,
    register,
    login,
    personalInfo,
    diary,
    circle,
    report,
    unseal
});