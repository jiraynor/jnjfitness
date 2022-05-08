import {
    SIGNIN_TRAINER,
    SIGNIN_USER,
    SIGNUP_TRAINER,
    SIGNUP_USER,
    AUTH_USER,
    GET_TRAINER,
    GET_USER
} from '../_actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case SIGNIN_TRAINER:
            return { ...state, loginSuccess: action.payload };
        case SIGNIN_USER:
            return { ...state, loginSuccess: action.payload };
        case SIGNUP_TRAINER:
            return { ...state, signup: action.payload };
        case SIGNUP_USER:
            return { ...state, signup: action.payload };
        case AUTH_USER:
            return { ...state, userData: action.payload };
        case GET_TRAINER:
            return { ...state, success: action.payload };
        case GET_USER:
            return { ...state, success: action.payload };
        default:
            return state;
    }
}