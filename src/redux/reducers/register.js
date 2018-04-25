import {
    Register_REQUEST,
    Register_FAIL,
    Register_SUCCESS,
    Vaildate_REQUEST,
    Vaildate_FAIL,
    Vaildate_SUCCESS,
    Captcha_REQUEST,
    Captcha_SUCCESS,
    Captcha_FAIL
} from 'actions/register';

const initState = {
    status: '',
    // true表示可以注册，数据库中不存在
    // false表示已存在，无法注册
    email: '',
    captcha:''
};

export default function reducer(state = initState, action) {
    switch (action.type) {

    case Register_REQUEST:
        return {
            ...state,
        };
    case Register_SUCCESS:
        // console.log(action.result.data);
        return {
            ...state,
            // // 传回来的是字符串，需要先转换成object类型的json对象
            status: action.result.data
        };
    case Register_FAIL:
        return {
            ...state,
        };


    case Vaildate_REQUEST:
        return {
            ...state,
        };
    case Vaildate_SUCCESS:
        // console.log(action.result.data);
        return {
            ...state,
            email: action.result.data === true ? 'success' : 'error'
        };
    case Vaildate_FAIL:
        return {
            ...state,
        };


    case Captcha_REQUEST:
        return {
            ...state,
        };
    case Captcha_SUCCESS:
        // console.log(action.result.data);
        return {
            ...state,
            captcha: action.result.data
        };
    case Captcha_FAIL:
        return {
            ...state,
        };
    default:
        return state;
    }
}