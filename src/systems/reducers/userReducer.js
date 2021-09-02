import {SET_USERS_DATA_SUCCESS, USER_REQUEST, USER_FAILED, REQUEST_PASSWORD_RESET, CLEAR_USER_STORE, USER_REQUEST_CLEAN} from '../actions';

const initialState = {
    userData: null,
    userRequest: false,
    userFailed: false,
    requestResetPassword: false
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_REQUEST:
            return {
                ...state,
                userRequest: true,
                userData: {},
                requestResetPassword: false
            }
        case SET_USERS_DATA_SUCCESS:
            return {
                ...state,
                userData: action.data,
                userRequest: false,
                userFailed: false,
                requestResetPassword: false
            }
        case USER_FAILED:
            return {
                ...state,
                userData: null,
                userFailed: true,
                requestResetPassword:false
            }
        case REQUEST_PASSWORD_RESET: {
            return {
                ...state,
                requestResetPassword: !state.requestResetPassword
            }
        }
        case USER_REQUEST_CLEAN: {
            return {
                ...state,
                userData: null,
                userRequest: false
            }
        }
        case CLEAR_USER_STORE:
            return initialState;
        default:
            return state;
    }
}