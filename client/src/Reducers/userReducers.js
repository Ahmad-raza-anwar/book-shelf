import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,

    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL

} from '../Constants/userConstants'

export const userSignUpReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case REGISTER_USER_REQUEST:
            return {
                loading: true,
            }

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success:action.success
            }

        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload
            }

        default:
            return state
    }
}

export const userLoginReducer = (state = { user:{} }, action ) => {
    switch(action.type){

        case LOGIN_USER_REQUEST:
            return {
                loading:true
            }

        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                success:action.success
            }

        case LOGIN_USER_FAIL:
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload
            }

        default:
            return state
    }
}

export const userResetReducer = (state = { user:{} }, action ) => {
    switch(action.type){

        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                loading:true
            }

        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }

        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload
            }

        default:
            return state
    }
}

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }

        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}