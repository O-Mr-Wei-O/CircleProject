export const PersonalInfo_REQUEST = 'PersonalInfo/PersonalInfor_REQUEST';
export const PersonalInfor_SUCCESS = 'PersonalInfo/PersonalInfo_SUCCESS';
export const PersonalInfo_FAIL = 'PersonalInfo/PersonalInfo_FAIL';

export const UpdateInfo_REQUEST = 'PersonalInfo/UpdateInfo_REQUEST';
export const UpdateInfo_SUCCESS = 'PersonalInfo/UpdateInfo_SUCCESS';
export const UpdateInfo_FAIL = 'PersonalInfo/UpdateInfo_FAIL';

// 获取个人信息
export function getPersonalInfo(email) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [PersonalInfo_REQUEST, PersonalInfor_SUCCESS, PersonalInfo_FAIL],
        promise: client => client.post('/api/getPersonalInfo', {data: email})
    };
}

// 更新个人信息
export function updatePersonalInfo(type, value, email) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [UpdateInfo_REQUEST, UpdateInfo_SUCCESS, UpdateInfo_FAIL],
        promise: client => client.post('/api/updatePersonalInfo/' + type, {data: value, email: email})
    };
}