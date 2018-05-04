import {PersonalInfo_REQUEST, PersonalInfo_FAIL, PersonalInfor_SUCCESS} from 'actions/personalInfo';

const initState = {
    avatar: null,
    nickname: null,
    sex: null,
    birthday: null,
    ifollowemail:'',
    followedme:''
};

export default function reducer(state = initState, action) {
    switch (action.type) {
    case PersonalInfo_REQUEST:
        return {
            ...state,
        };
    case PersonalInfor_SUCCESS:
        // console.log(action.result.data);
        return {
            ...state,
            avatar: action.result.data.avatar,
            nickname: action.result.data.nickname,
            sex: parseInt(action.result.data.sex),
            birthday: action.result.data.birthday,
            ifollowemail:action.result.data.ifollowemail,
            followedme:action.result.data.followedme
        };
    case PersonalInfo_FAIL:
        return {
            ...state,
        };
    default:
        return state;
    }
}