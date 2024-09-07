import React, { useState, useEffect } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs';

const Home = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const result = await axios.get('https://todolist-backend-pgq8.onrender.com/get');
                setTodos(result.data); // Set the fetched todos in the state
            } catch (err) {
                console.log(err); // Handle any errors
            }
        };
        fetchTodos();
    }, []);

    const handleEdit = async (id) => {
        try {
            const result = await axios.put('https://todolist-backend-pgq8.onrender.com/update/' + id);
            setTodos(prevTodos => prevTodos.map(todo => todo._id === id ? { ...todo, done: !todo.done } : todo));
        } catch (err) {
            console.log(err); // Handle any errors
        }
    };

    const handleDelete = async (id) => {
        try {
            const result = await axios.delete('https://todolist-backend-pgq8.onrender.com/delete/' + id);
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
        } catch (err) {
            console.log(err); // Handle any errors
        }
    };

    return (
        <div className='home'>
            <h2>Todo List</h2>
            <Create setTodos={setTodos} />
            {
                todos.length === 0
                    ? <div><h2>NO Record</h2></div>
                    : todos.map(todo => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                {todo.done ? 
                                    <BsFillCheckCircleFill className='icon' /> :
                                    <BsCircleFill className='icon' />
                                }
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <span> <BsFillTrashFill className='icon icon_delete' onClick={() => handleDelete(todo._id)} /></span>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
};

export default Home;
