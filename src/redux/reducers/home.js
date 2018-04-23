import {GET_NEWS_TOP_REQUEST, GET_NEWS_TOP_FAIL, GET_NEWS_TOP_SUCCESS} from 'actions/home';

const initState = {
};

export default function reducer(state = initState, action) {
    switch (action.type) {
    case GET_NEWS_TOP_REQUEST:
        return {
            ...state,
        };
    case GET_NEWS_TOP_SUCCESS:
        // console.log(action.result.data);
        return {
            ...state,
            // 传回来的是字符串，需要先转换成object类型的json对象
            news:JSON.parse(action.result.data)
        };
    case GET_NEWS_TOP_FAIL:
        return {
            ...state,
        };
    default:
        return state;
    }
}