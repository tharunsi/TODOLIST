import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const Create = ({ setTodos }) => {
    const [task, setTask] = useState('');

    const handleAdd = async () => {
        if (!task) return; // Prevent adding empty tasks
        try {
            const result = await axios.post('https://todolist-backend-pgq8.onrender.com/add', { task });
            setTodos(prevTodos => [...prevTodos, result.data]);
            setTask(''); // Clear the input field
        } catch (err) {
            console.log(err); // Handle any errors
        }
    };

    return (
        <div className='create_form'>
            <input 
                type="text" 
                placeholder="Enter Task" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
            />
            <button type="button" onClick={handleAdd}>ADD</button>
        </div>
    );
};

export default Create;
