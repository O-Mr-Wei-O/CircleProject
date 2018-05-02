export const REPORT_REQUEST = 'REPORT/REPORT_REQUEST';
export const REPORT_SUCCESS = 'REPORT/REPORT_SUCCESS';
export const REPORT_FAIL = 'REPORT/REPORT_FAIL';

export const BAN_REQUEST = 'REPORT/BAN_REQUEST';
export const BAN_SUCCESS = 'REPORT/BAN_SUCCESS';
export const BAN_FAIL = 'REPORT/BAN_FAIL';

// 获取被举报的日记信息
export function getReport() {
    // console.log('action');
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [REPORT_REQUEST, REPORT_SUCCESS, REPORT_FAIL],
        promise: client => client.post('/api/getreport')
    };
}

// 同时封禁用户以及日记
export function banDiaryAndUser(diaryid,userid) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [BAN_REQUEST, BAN_SUCCESS, BAN_FAIL],
        promise: client => client.post('/api/ban',{diaryid:diaryid,userid:userid})
    };
}