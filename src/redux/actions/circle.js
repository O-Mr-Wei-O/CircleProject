export const Circle_REQUEST = 'Circle/Circle_REQUEST';
export const Circle_SUCCESS = 'Circle/Circle_SUCCESS';
export const Circle_FAIL = 'Circle/Circle_FAIL';

export const Comment_REQUEST = 'Comment/Comment_REQUEST';
export const Comment_SUCCESS = 'Comment/Comment_SUCCESS';
export const Comment_FAIL = 'Comment/Comment_FAIL';

// 获取日记信息
export function getCircle() {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [Circle_REQUEST, Circle_SUCCESS, Circle_FAIL],
        promise: client => client.post('/api/circle')
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