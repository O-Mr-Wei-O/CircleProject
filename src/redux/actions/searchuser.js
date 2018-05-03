export const SEARCH_USER_REQUEST = 'Search/SEARCH_USER_REQUEST';
export const SEARCH_USER_SUCCESS = 'Search/SEARCH_USER_SUCCESS';
export const SEARCH_USER_FAIL = 'Search/SEARCH_USER_FAIL';

export const SEARCH_USER_Accurate_REQUEST = 'Search/SEARCH_USER_Accurate_REQUEST';
export const SEARCH_USER_Accurate_SUCCESS = 'Search/SEARCH_USER_Accurate_SUCCESS';
export const SEARCH_USER_Accurate_FAIL = 'Search/SEARCH_USER_Accurate_FAIL';

export const FOLLOW_REQUEST = 'Search/FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'Search/FOLLOW_SUCCESS';
export const FOLLOW_FAIL = 'Search/FOLLOW_FAIL';

// 模糊搜索用户信息
export function searchuserVague(value) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, SEARCH_USER_FAIL],
        promise: client => client.post('/api/searchuserVague', {value:value})
    };
}

// 精确匹配用户信息
export function searchuserAccurate(value) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [SEARCH_USER_Accurate_REQUEST, SEARCH_USER_Accurate_SUCCESS, SEARCH_USER_Accurate_FAIL],
        promise: client => client.post('/api/searchuserAccurate', {value:value})
    };
}

// 关注用户
export function followUser(followdemail,myemail) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAIL],
        promise: client => client.post('/api/follow', {followdemail:followdemail,myemail:myemail})
    };
}