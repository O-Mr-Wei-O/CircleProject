import {CHAT_REQUEST, CHAT_FAIL, CHAT_SUCCESS} from 'actions/chat';

const initState = {
    // 我关注的人
    ifollow: null
};

export default function reducer(state = initState, action) {
    switch (action.type) {
    case CHAT_REQUEST:
        return {
            ...state,
        };
    case CHAT_SUCCESS:
        // console.log(action.result.data);
        return {
            ...state,
            // 传回来的是字符串，需要先转换成object类型的json对象
            ifollow: action.result.data
        };
    case CHAT_FAIL:
        return {
            ...state,
        };
    default:
        return state;
    }
}