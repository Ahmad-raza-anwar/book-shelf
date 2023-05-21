import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {userSignUpReducer,userLoginReducer,userResetReducer,allUsersReducer} from './Reducers/userReducers'

import { bookGetReducer, bookDeleteReducer, bookEditStoreReducer,  bookEditReducer } from './Reducers/booksReducer'

const reducer = combineReducers({
    signUpreducer:userSignUpReducer,
    logInreducer:userLoginReducer,
    Resetreducer:userResetReducer,
    allUserreducer:allUsersReducer,
    AllBooks: bookGetReducer,
    deleteItem: bookDeleteReducer,
    editItem: bookEditReducer,
    storeEditItem: bookEditStoreReducer,
})

let initialState = {}

const middleWare = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleWare)))

export default store