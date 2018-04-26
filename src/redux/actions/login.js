export const Login_REQUEST = 'Login/Login_REQUEST';
export const Login_SUCCESS = 'Login/Login_SUCCESS';
export const Login_FAIL = 'Login/Login_FAIL';

export function postLogin(values) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [Login_REQUEST, Login_SUCCESS, Login_FAIL],
        promise: client => client.post('/api/login',{data:values})
    };
}