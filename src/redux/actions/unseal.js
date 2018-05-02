export const UNSEAL_REQUEST = 'UNSEAL/UNSEAL_REQUEST';
export const UNSEAL_SUCCESS = 'UNSEAL/UNSEAL_SUCCESS';
export const UNSEAL_FAIL = 'UNSEAL/UNSEAL_FAIL';

export const GET_UNSEAL_REQUEST = 'UNSEAL/GET_UNSEAL_REQUEST';
export const GET_UNSEAL_SUCCESS = 'UNSEAL/GET_UNSEAL_SUCCESS';
export const GET_UNSEAL_FAIL = 'UNSEAL/GET_UNSEAL_FAIL';

export const APPROVE_UNSEAL_REQUEST = 'UNSEAL/APPROVE_UNSEAL_REQUEST';
export const APPROVE_UNSEAL_SUCCESS = 'UNSEAL/APPROVE_UNSEAL_SUCCESS';
export const APPROVE_UNSEAL_FAIL = 'UNSEAL/APPROVE_UNSEAL_FAIL';

// 申请解封
export function unsealAction(values) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [UNSEAL_REQUEST, UNSEAL_SUCCESS, UNSEAL_FAIL],
        promise: client => client.post('/api/unseal',{data:values})
    };
}

// 获取解封申请
export function getunseal() {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [GET_UNSEAL_REQUEST, GET_UNSEAL_SUCCESS, GET_UNSEAL_FAIL],
        promise: client => client.post('/api/getunseal')
    };
}

// 获取解封申请
export function approveunseal(proposer) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [APPROVE_UNSEAL_REQUEST, APPROVE_UNSEAL_SUCCESS, APPROVE_UNSEAL_FAIL],
        promise: client => client.post('/api/approveunseal/'+proposer)
    };
}
