import {createStore , combineReducers , applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import  {TodoReducer}  from './Reducer/TodoReducer'

const rootReducer = combineReducers({
    todoList : TodoReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store