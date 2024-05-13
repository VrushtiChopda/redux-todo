import React ,{useEffect} from 'react'
import { getTodoList } from '../action/Action'
import {useSelector,useDispatch} from 'react-redux'
function TodoList() {
    const myTodo = useSelector(state => state.todoList.todo.data)
    console.log(myTodo,'ergtrwejfhsalejkfhaew')
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTodoList())
    },[dispatch])
  return (
    <>
      <h1>Todo list</h1>
      <ul>
        {
            myTodo && myTodo.length !== 0 ? myTodo.map((todo)=>(
                <li key={todo.id}>{todo.title} / {todo.description}</li>
            )) : <p>Data not found</p>
        }
      </ul>
    </>
  )
}

export default TodoList
