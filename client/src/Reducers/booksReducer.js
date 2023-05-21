import {
    GET_BOOK_REQUEST,
    GET_BOOK_SUCCESS,
    GET_BOOK_FAIL,

    DELETE_BOOK_REQUEST,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAIL,

    EDIT_BOOK_REQUEST,
    EDIT_BOOK_SUCCESS,
    EDIT_BOOK_FAIL,
    
    EDIT_BOOK_STORE_REQUEST,
    EDIT_BOOK_STORE_SUCCESS,
    EDIT_BOOK_STORE_FAIL
} from '../Constants/bookConstants'

export const bookGetReducer = (state = { books: {} }, action) => {
    switch (action.type) {

        case GET_BOOK_REQUEST:
            return {
                loading: true,
            }

        case GET_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                books:action.data
            }

        case GET_BOOK_FAIL:
            return {
                ...state,
                loading: false,
                books: null,
                error: action.payload
            }

            default:
            return state
    }
}

export const bookDeleteReducer = (state = { books: {} }, action) => {
    switch (action.type) {
        
        case DELETE_BOOK_REQUEST:
            return {
                loading: true,
            }

        case DELETE_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                message:action.message
            }

        case DELETE_BOOK_FAIL:
            return {
                ...state,
                loading: false,
                books: null,
                error: action.payload
            }

            default:
            return state
    }
}


export const bookEditReducer = (state = { books: {} }, action) => {
    switch (action.type) {
        
        case EDIT_BOOK_REQUEST:
            return {
                loading: true,
            }

        case EDIT_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                message:action.message
            }

        case EDIT_BOOK_FAIL:
            return {
                ...state,
                loading: false,
                books: null,
                error: action.payload
            }

            default:
            return state
    }
}


export const bookEditStoreReducer = (state = { books: {} }, action) => {
    switch (action.type) {
        
        case EDIT_BOOK_STORE_REQUEST:
            return {
                loading: true,
            }

        case EDIT_BOOK_STORE_SUCCESS:
            return {
                ...state,
                loading: false,
                data:action.data
            }

        case EDIT_BOOK_STORE_FAIL:
            return {
                ...state,
                loading: false,
                books: null,
                error: action.payload
            }

            default:
            return state
    }
}