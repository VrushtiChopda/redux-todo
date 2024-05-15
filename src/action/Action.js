import axios from 'axios'
import * as actiontypes from './ActionTypes'

const baseUrl = 'http://localhost:3000/todo'


//get data
export const getTodoList = () =>{
    return async(dispatch) =>{
        try {
                const response = await axios.get(`${baseUrl}/get-todo-list`)
                // console.log(response , "<---------action log -------------->")
                dispatch({type : actiontypes.TODO_SUCCESS , payload : response.data})
        }
        catch(error){
            console.log(error , "<---------action log -------------->")

            dispatch({type : actiontypes.TODO_FAILURE ,payload : error.message})
        }
    }
}

//add data
export const addTodoList = (todo)=>{
    return async(dispatch) =>{
        try {
            const response = await axios.post(`${baseUrl}/add-todo-list`,{
                title : todo.title,
                description : todo.description
            });
            console.log(response.data,"<---------action log -------------->")
            dispatch({type : actiontypes.ADD_TODO_SUCESS , payload : response})
        }
        catch (error){
            dispatch({type : actiontypes.ADD_TODO_FAILURE ,payload : error.message})
        }
    }
}

//delete data
export const DeleteTodo = (id) =>{
    return async(dispatch) =>{
        try{
            // console.log(id , '-----------iiiiii')
            const response = await axios.delete(`${baseUrl}/delete-todo-list/${id}`)
            // console.log(response.data)   
            dispatch({type : actiontypes.DELETE_TODO_SUCCESS , payload : id})
            console.log(`Todo with ID ${id} deleted successfully`);
        }
        catch (error){
            dispatch({type : actiontypes.DELETE_TODO_FAILURE , payload : error.message})
        }
    }
}