import axios from 'axios'
import * as actiontypes from './ActionTypes'

const baseUrl = 'http://localhost:3000/todo'

export const getTodoList = () =>{
    return async(dispatch) =>{
        try {
                const response = await axios.get(`${baseUrl}/get-todo-list`)
                console.log(response)
                dispatch({type : actiontypes.TODO_SUCCESS , payload : response.data})
        }
        catch(error){
            dispatch({type : actiontypes.TODO_FAILURE ,payload : error.message})
        }
    }
}