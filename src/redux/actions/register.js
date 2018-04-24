export const Register_REQUEST = 'register/Register_REQUEST';
export const Register_SUCCESS = 'register/Register_SUCCESS';
export const Register_FAIL = 'register/Register_FAIL';

export const Vaildate_REQUEST = 'register/Vaildate_REQUEST';
export const Vaildate_SUCCESS = 'register/Vaildate_SUCCESS';
export const Vaildate_FAIL = 'register/Vaildate_FAIL';

// 注册
export function postRegister(values) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [Register_REQUEST, Register_SUCCESS, Register_FAIL],
        promise: client => client.post('/api/register',{data:values})
    };
}

// 验证数据库中是否已经存在同样的email
export function validate(email) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [Vaildate_REQUEST, Vaildate_SUCCESS, Vaildate_FAIL],
        promise: client => client.post('/api/validate',{data:email})
    };
}