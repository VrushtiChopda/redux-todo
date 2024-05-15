import {createStore , combineReducers , applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import  {TodoReducer}  from './Reducer/TodoReducer'
import { AddTodoReducer } from './Reducer/TodoReducer'
const rootReducer = combineReducers({
    todo : TodoReducer,
})
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store