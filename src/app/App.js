import { useState } from 'react';
import AddTodo from '../components/AddTodo';
import './App.css';

function App() {
  const [formVisibility , setFormVisibility] = useState(false)

  const handleEdit = (todo) =>{
    setFormVisibility(true)
  
  }

  return (
    <>
      <h1 className='text-center'>To Do</h1>
      <AddTodo handleEdit={handleEdit} formVisibility={formVisibility} />
    </>
  );
}

export default App;
