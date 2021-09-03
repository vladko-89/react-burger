import {SET_USERS_DATA_SUCCESS, USER_REQUEST, USER_FAILED, REQUEST_PASSWORD_RESET, ERROR_401, CLEAR_USER_STORE, USER_REQUEST_CLEAN} from '../actions';

const initialState = {
    userData: null,
    userRequest: false,
    userFailed: false,
    requestResetPassword: false,
    error_401: false
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_REQUEST:
            return {
                ...state,
                userRequest: true,
                userData: {},
                requestResetPassword: false,
                error_401: false
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
                userRequest: false,
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
        case ERROR_401: {
            return {
                ...state,
                error_401: true
            }
        }
        case CLEAR_USER_STORE:
            return initialState;
        default:
            return state;
    }
}