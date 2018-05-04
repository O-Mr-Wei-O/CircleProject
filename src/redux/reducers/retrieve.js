import {RETRIEVE_REQUEST, RETRIEVE_FAIL, RETRIEVE_SUCCESS} from 'actions/retrieve';

const initState = {
    // 验证码
    code: '------'
};

export default function reducer(state = initState, action) {
    switch (action.type) {
    case RETRIEVE_REQUEST:
        return {
            ...state,
        };
    case RETRIEVE_SUCCESS:
        // console.log(action.result.data);
        return {
            ...state,
            code: action.result.data
        };
    case RETRIEVE_FAIL:
        return {
            ...state,
        };
    default:
        return state;
    }
}