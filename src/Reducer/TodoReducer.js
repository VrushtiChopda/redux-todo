import * as actiontypes from '../action/ActionTypes'

const initialState = {
    todo: [],
    error: null
}

export const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actiontypes.TODO_SUCCESS:
            return {
                ...state, todo: action.payload, error: null
            }
        case actiontypes.TODO_FAILURE:
            return {
                ...state, error: action.payload
            }
        default :
            return state
    }
}