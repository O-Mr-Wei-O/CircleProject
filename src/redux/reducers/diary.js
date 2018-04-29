import {Diary_REQUEST, Diary_FAIL, Diary_SUCCESS} from 'actions/diary';

const initState = {
    // 发表日记的状态，true为成功，false为失败
    status: null
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
    default:
        return state;
    }
}