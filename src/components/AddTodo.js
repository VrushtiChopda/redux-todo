import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { DeleteTodo, addTodoList, getTodoList } from '../action/Action'
import { useDispatch, useSelector } from 'react-redux'
export default function AddTodo() {

    const dispatch = useDispatch();
    const todoList = useSelector(state => state.todo.todos)
    // console.log(todoList, "uhuhyuhuhuhuhuhuhuhuh")
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    })
    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async event => {
        event.preventDefault()
        const { title, description } = formData;
        const todoData = { title, description }
        console.log(todoData)
        try {
            await dispatch(addTodoList(todoData));
            await dispatch(getTodoList());
            setFormData({
                title: '',
                description: ''
            })
        }
        catch (error) {
            console.log(error, 'error in add data')
        }
    }

    const handleDelete = async (id) => {

        await dispatch(DeleteTodo(id));
        await dispatch(getTodoList())

    }
    useEffect(() => {
        dispatch(getTodoList())
    }, [dispatch])

    return (
        <>
            <center>
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
                </form>
                <Table bordered striped hover size='sm' variant='dark' style={{ width: "600px" }}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoList && todoList.length !== 0 ? (
                            todoList?.data?.map(todo => (
                                <tr key={todo._id}>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>
                                        <tr className='d-flex justify-content-evenly'>
                                            <td><Button type='submit'>Edit</Button></td>
                                            <td><Button type='submit' variant='danger' onClick={() => { handleDelete(todo._id) }}>Delete</Button></td>
                                        </tr>
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
            </center>
        </>
    )
}   
