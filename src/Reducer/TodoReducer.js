import * as actiontypes from '../action/ActionTypes'
const initialState = {
    todos: [],
    error: null,
    addTodo: []
}

//get data
export const TodoReducer = (state = initialState, action) => {
    switch (action.type) {

        //get data
        case actiontypes.TODO_SUCCESS:
            return {
                ...state, todos: action.payload, error: null
            }
        case actiontypes.TODO_FAILURE:
            return {
                ...state, error: action.payload
            }

        //add data
        case actiontypes.ADD_TODO_SUCESS:
            return {
                ...state, todo: [...state.todos, action.payload]
            }
        case actiontypes.ADD_TODO_FAILURE:
            return {
                error: action.payload
            }

        //delete data
        case actiontypes.DELETE_TODO_SUCCESS:
            return {
                ...state, todo: [state.todos.filter(todo => todo.id !== action.payload)]
            }
        case actiontypes.DELETE_TODO_FAILURE:
            return state

        //edit data
        case actiontypes.EDIT_TODO_SUCCESS:
            const updatedTodo = action.payload;
            return state.map(todo => {
                if (todo.id === updatedTodo.id) {
                    return {
                        ...todo,
                        title: updatedTodo.title,
                        description: updatedTodo.description
                    };
                }
                return todo;
            });
        case actiontypes.EDIT_TODO_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}