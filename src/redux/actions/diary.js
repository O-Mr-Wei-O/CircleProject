export const Diary_REQUEST = 'Diary/Diary_REQUEST';
export const Diary_SUCCESS = 'Diary/Diary_SUCCESS';
export const Diary_FAIL = 'Diary/Diary_FAIL';

export function writeDiary(email, title, content, pic) {
    // console.log('action');
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [Diary_REQUEST, Diary_SUCCESS, Diary_FAIL],
        promise: client => client.post('/api/diary', {email: email, title: title, content: content, pic: pic})
    };
}