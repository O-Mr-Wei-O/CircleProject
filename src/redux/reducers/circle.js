import {Circle_REQUEST, Circle_FAIL, Circle_SUCCESS,Comment_REQUEST,Comment_SUCCESS,Comment_FAIL} from 'actions/circle';

const initState = {
    // 日记的所有数据
    diary: null,
    comment:null
};

export default function reducer(state = initState, action) {
    switch (action.type) {
    case Circle_REQUEST:
        return {
            ...state,
        };
    case Circle_SUCCESS:
        // console.log(action.result.data);
        return {
            ...state,
            // 传回来的是字符串，需要先转换成object类型的json对象
            diary: action.result.data.diary,
            comment:action.result.data.comment
        };
    case Circle_FAIL:
        return {
            ...state,
        };


    case Comment_REQUEST:
        return {
            ...state,
        };
    case Comment_SUCCESS:
        return {
            ...state,
        };
    case Comment_FAIL:
        return {
            ...state,
        };
    default:
        return state;
    }
}