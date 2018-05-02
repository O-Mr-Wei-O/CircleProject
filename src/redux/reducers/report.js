import {REPORT_REQUEST, REPORT_FAIL, REPORT_SUCCESS} from 'actions/report';

const initState = {
    // 被举报的日记，仅获取两人以上举报的日记
    reportDiary:null
};

export default function reducer(state = initState, action) {
    switch (action.type) {
    case REPORT_REQUEST:
        return {
            ...state,
        };
    case REPORT_SUCCESS:
        // console.log(action.result.data);
        return {
            ...state,
            reportDiary:action.result.data
        };
    case REPORT_FAIL:
        return {
            ...state,
        };
    default:
        return state;
    }
}