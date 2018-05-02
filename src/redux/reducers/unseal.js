import {GET_UNSEAL_REQUEST, GET_UNSEAL_FAIL, GET_UNSEAL_SUCCESS} from 'actions/unseal';

const initState = {
    unsealApplication: null
};

export default function reducer(state = initState, action) {
    switch (action.type) {
    case GET_UNSEAL_REQUEST:
        return {
            ...state,
        };
    case GET_UNSEAL_SUCCESS:
        // console.log(action.result.data);
        return {
            ...state,
            unsealApplication: action.result.data
        };
    case GET_UNSEAL_FAIL:
        return {
            ...state,
        };
    default:
        return state;
    }
}