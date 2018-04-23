export const GET_NEWS_TOP_REQUEST = 'home/GET_NEWS_TOP_REQUEST';
export const GET_NEWS_TOP_SUCCESS = 'home/GET_NEWS_TOP_SUCCESS';
export const GET_NEWS_TOP_FAIL = 'home/GET_NEWS_TOP_FAIL';

export function getTopNews(id) {
    return {
        //如果不写三个，这里的type或报错，因为在中间件里定义了三个
        types: [GET_NEWS_TOP_REQUEST, GET_NEWS_TOP_SUCCESS, GET_NEWS_TOP_FAIL],
        // promise: client => client.get('http://v.juhe.cn/toutiao/index?type=top&key=a3ca67cbd97329559d686f9e3d33d634')
        promise: client => client.get('/api/top_News/'+id)
    };
}