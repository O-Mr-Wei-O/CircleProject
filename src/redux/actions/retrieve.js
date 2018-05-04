export const RETRIEVE_REQUEST = 'RETRIEVE/RETRIEVE_REQUEST';
export const RETRIEVE_SUCCESS = 'Diary/RETRIEVE_SUCCESS';
export const RETRIEVE_FAIL = 'Diary/RETRIEVE_FAIL';

// 发送验证码
export function sendCapt(email) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [RETRIEVE_REQUEST, RETRIEVE_SUCCESS, RETRIEVE_FAIL],
        promise: client => client.post('/api/captcha', {data: email})
    };
}

// 改密码
export function updatePwd(email,newPwd) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [RETRIEVE_REQUEST, RETRIEVE_SUCCESS, RETRIEVE_FAIL],
        promise: client => client.post('/api/updatePwd', {email:email,newPwd: newPwd})
    };
}