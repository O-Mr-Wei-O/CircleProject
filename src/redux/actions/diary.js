export const Diary_REQUEST = 'Diary/Diary_REQUEST';
export const Diary_SUCCESS = 'Diary/Diary_SUCCESS';
export const Diary_FAIL = 'Diary/Diary_FAIL';

export const WHO_FOLLOW_REQUEST = 'Diary/WHO_FOLLOW_REQUEST';
export const WHO_FOLLOW_SUCCESS = 'Diary/WHO_FOLLOW_SUCCESS';
export const WHO_FOLLOW_FAIL = 'Diary/WHO_FOLLOW_FAIL';

// 谁关注了我
export function whoFollowme(email) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [WHO_FOLLOW_REQUEST, WHO_FOLLOW_SUCCESS, WHO_FOLLOW_FAIL],
        promise: client => client.post('/api/diarywhofollow', {email: email})
    };
}

// 写日记
export function writeDiary(email, title, content, pic) {
    // console.log('action');
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [Diary_REQUEST, Diary_SUCCESS, Diary_FAIL],
        promise: client => client.post('/api/diary', {email: email, title: title, content: content, pic: pic})
    };
}