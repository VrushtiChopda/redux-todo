import * as actiontypes from '../action/ActionTypes'
const initialState = {
    todos: [],
    error: null,
    addTodo : []
}

//get data
export const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actiontypes.TODO_SUCCESS:
            return {
                ...state, todos: action.payload, error: null
            }
        case actiontypes.TODO_FAILURE:
            return {
                ...state, error: action.payload
            }
        case actiontypes.ADD_TODO_SUCESS:
            return {
                ...state, todo: [...state.todos, action.payload]
            }
        case actiontypes.ADD_TODO_FAILURE:
            return {
                error: action.payload
            }
        case actiontypes.DELETE_TODO_SUCCESS: return {
            ...state, todo: [state.todos.filter(todo => todo.id !== action.payload )]
        }
        case actiontypes.DELETE_TODO_FAILURE:
            return state
        default:
            return state
    }
}

// // add data
// export const AddTodoReducer = (state = initialState, action) => {
//     switch (action.type) {

//         default:
//             return state
//     }
// }

// //delete data 
// export const DeleteTodoReducer = (state = initialState, action) => {
//     switch (action.type) {

//         default:
//             return state
//     }
// }