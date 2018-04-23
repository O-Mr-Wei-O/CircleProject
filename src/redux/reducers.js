import {combineReducers} from 'redux';

import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';
import home from 'reducers/home';


export default combineReducers({
    counter,
    userInfo,
    home
});