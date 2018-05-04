import {
    Diary_REQUEST,
    Diary_FAIL,
    Diary_SUCCESS,
    WHO_FOLLOW_REQUEST,
    WHO_FOLLOW_FAIL,
    WHO_FOLLOW_SUCCESS
} from 'actions/diary';

const initState = {
    // 发表日记的状态，true为成功，false为失败
    status: null,
    followedme:''
};

export default function reducer(state = initState, action) {
    switch (action.type) {
    case Diary_REQUEST:
        return {
            ...state,
        };
    case Diary_SUCCESS:
        // console.log(action.result.data);
        return {
            ...state,
            // 传回来的是字符串，需要先转换成object类型的json对象
            status: action.result.data
        };
    case Diary_FAIL:
        return {
            ...state,
        };
    case WHO_FOLLOW_REQUEST:
        return {
            ...state,
        };
    case WHO_FOLLOW_SUCCESS:
        // console.log(action.result.data);
        return {
            ...state,
            // 传回来的是字符串，需要先转换成object类型的json对象
            followedme: action.result.data
        };
    case WHO_FOLLOW_FAIL:
        return {
            ...state,
        };
    default:
        return state;
    }
}