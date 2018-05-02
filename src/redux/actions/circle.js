export const Circle_REQUEST = 'Circle/Circle_REQUEST';
export const Circle_SUCCESS = 'Circle/Circle_SUCCESS';
export const Circle_FAIL = 'Circle/Circle_FAIL';

export const Comment_REQUEST = 'Comment/Comment_REQUEST';
export const Comment_SUCCESS = 'Comment/Comment_SUCCESS';
export const Comment_FAIL = 'Comment/Comment_FAIL';

export const ZAN_REQUEST = 'Circle/ZAN_REQUEST';
export const ZAN_SUCCESS = 'Circle/ZAN_SUCCESS';
export const ZAN_FAIL = 'Circle/ZAN_FAIL';

export const COLLECT_REQUEST = 'Circle/COLLECT_REQUEST';
export const COLLECT_SUCCESS = 'Circle/COLLECT_SUCCESS';
export const COLLECT_FAIL = 'Circle/COLLECT_FAIL';

export const REPORT_REQUEST = 'Circle/REPORT_REQUEST';
export const REPORT_SUCCESS = 'Circle/REPORT_SUCCESS';
export const REPORT_FAIL = 'Circle/REPORT_FAIL';

// 获取日记信息
export function getCircle(email) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [Circle_REQUEST, Circle_SUCCESS, Circle_FAIL],
        promise: client => client.post('/api/circle',{email:email})
    };
}

// 评论
export function comment(email, diaryid, pid, replyid, commentText) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [Comment_REQUEST, Comment_SUCCESS, Comment_FAIL],
        promise: client => client.post('/api/comment', {
            email: email,
            diaryid: diaryid,
            pid: pid,
            replyid: replyid,
            commentText: commentText
        })
    };
}

// 点赞
export function zanAdd(diaryid, email, number, who) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [ZAN_REQUEST, ZAN_SUCCESS, ZAN_FAIL],
        promise: client => client.post('/api/zan', {
            diaryid: diaryid,
            email: email,
            number: number,
            who: who
        })
    };
}

// 收藏
export function collect(email, diaryid) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [COLLECT_REQUEST, COLLECT_SUCCESS, COLLECT_FAIL],
        promise: client => client.post('/api/collect', {
            email: email,
            diaryid: diaryid
        })
    };
}

// 举报
export function report(diaryid,reporter) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [REPORT_REQUEST, REPORT_SUCCESS, REPORT_FAIL],
        promise: client => client.post('/api/report', {
            diaryid: diaryid,
            reporter: reporter
        })
    };
}