import {
    SEARCH_USER_REQUEST,
    SEARCH_USER_FAIL,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_Accurate_REQUEST,
    SEARCH_USER_Accurate_SUCCESS,
    SEARCH_USER_Accurate_FAIL
} from 'actions/searchuser';

const initState = {
    // 发表日记的状态，true为成功，false为失败
    user: []
};

export default function reducer(state = initState, action) {
    switch (action.type) {
    case SEARCH_USER_REQUEST:
        return {
            ...state,
        };
    case SEARCH_USER_SUCCESS:
        // console.log(action.result.data);
        return {
            ...state,
            // 传回来的是字符串，需要先转换成object类型的json对象
            user: action.result.data
        };
    case SEARCH_USER_FAIL:
        return {
            ...state,
        };
    case SEARCH_USER_Accurate_REQUEST:
        return {
            ...state,
        };
    case SEARCH_USER_Accurate_SUCCESS:
        console.log(action.result.data);
        return {
            ...state,
            // 传回来的是字符串，需要先转换成object类型的json对象
            user: action.result.data
        };
    case SEARCH_USER_Accurate_FAIL:
        return {
            ...state,
        };
    default:
        return state;
    }
}