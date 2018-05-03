export const Broadcast_REQUEST = 'Broadcast/Broadcast_REQUEST';
export const Broadcast_SUCCESS = 'Broadcast/Broadcast_SUCCESS';
export const Broadcast_FAIL = 'Broadcast/Broadcast_FAIL';

export function sendBroadcast(text) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [Broadcast_REQUEST, Broadcast_SUCCESS, Broadcast_FAIL],
        promise: client => client.post('/api/broadcast', {text:text})
    };
}