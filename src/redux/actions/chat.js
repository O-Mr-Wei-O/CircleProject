export const CHAT_REQUEST = 'CHAT/CHAT_REQUEST';
export const CHAT_SUCCESS = 'CHAT/CHAT_SUCCESS';
export const CHAT_FAIL = 'CHAT/CHAT_FAIL';

// 获取我关注的人的列表
export function getiFollowed(email) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [CHAT_REQUEST, CHAT_SUCCESS, CHAT_FAIL],
        promise: client => client.post('/api/getiFollowed', {email: email})
    };
}