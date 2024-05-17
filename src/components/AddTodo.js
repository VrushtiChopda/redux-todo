import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { DeleteTodo, addTodoList, getTodoList, updateTodo } from '../action/Action'
import { useDispatch, useSelector } from 'react-redux'
export default function AddTodo({ handleEdit, formVisibility, editTodo }) {

    const dispatch = useDispatch();
    const todoList = useSelector(state => state.todo.todos)
    const [formData, setFormData] = useState({
        todoId: '',
        title: '',
        description: ''
    })

    //get data
    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    //add data
    const handleSubmit = async event => {
        event.preventDefault()
        const { title, description } = formData;
        const todoData = { title, description }
        console.log(todoData)
        try {
            await dispatch(addTodoList(todoData));
            await dispatch(getTodoList());
            setFormData({
                id: '',
                title: '',
                description: ''
            })
        }
        catch (error) {
            console.log(error, 'error in add data')
        }
    }

    //delete data
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this todo')) {
            dispatch(DeleteTodo(id));
            dispatch(getTodoList())
        }
    }

    //update data
    const handleSelectTodo = (todo) => {
        setFormData({
            todoId: todo._id,
            title: todo.title,
            description: todo.description
        });
        handleEdit(true);
    }
    const handleUpdate = (e) => {
        e.preventDefault();

        let editedObj = {
            todoId: formData.todoId,
            title: formData.title,
            description: formData.description
        }

        dispatch(updateTodo(editedObj))
        dispatch(getTodoList());
        window.location.reload()
    }
    useEffect(() => {
        dispatch(getTodoList())
    }, [dispatch])

    return (
        <>
            <center>
                {formVisibility === false ?
                    <form onSubmit={handleSubmit}>
                        <input
                            className='mb-3'
                            type='text'
                            name='title'
                            placeholder='Enter Title'
                            value={formData.title}
                            onChange={handleChange}
                            style={{ borderRadius: '5px' }}
                        /> {' '}
                        <input
                            className='mb-3'
                            type='text'
                            name='description'
                            placeholder='Enter Description'
                            value={formData.description}
                            onChange={handleChange}
                            style={{ borderRadius: '5px' }}
                        /> {' '}
                        <Button
                            type='submit'
                            className='mb-1'
                            size='sm'
                        >Add Todo</Button>
                    </form> : <form onSubmit={handleUpdate}>
                        <input
                            className='mb-3'
                            type='text'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                            placeholder='Update Title'
                            style={{ borderRadius: '5px' }}
                        /> {' '}
                        <input
                            className='mb-3'
                            type='text'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            placeholder='Update Description'
                            style={{ borderRadius: '5px' }}
                        /> {' '}
                        <Button
                            type='submit'
                            className='mb-1'
                            size='sm'

                        >Update Todo</Button>
                    </form>
                }

                <Table bordered striped hover size='sm' variant='dark' style={{ width: "500px" }}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoList && todoList.length !== 0 ? (
                            todoList.data?.map(todo => (
                                <tr key={todo._id}>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>

                                        {formVisibility === false && (
                                            <>
                                                <tr className='d-flex justify-content-evenly'>
                                                    <td><Button type='submit' onClick={() => handleSelectTodo(todo, todo._id)}>Edit</Button></td>
                                                    <td><Button type='submit' variant='danger' onClick={() => { handleDelete(todo._id) }}>Delete</Button></td>
                                                </tr>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No todos found</td>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </center >
        </>
    )
}   
