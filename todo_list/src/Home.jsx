import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id, currentStatus) => {
        axios.put(`http://localhost:3000/update/${id}`, { completed: !currentStatus })
            .then(result => {
                setTodos(prevTodos => {
                    const updatedTodos = prevTodos.map(todo => todo._id === id ? { ...todo, completed: !currentStatus } : todo);
                    console.log(updatedTodos); 
                    return updatedTodos;
                });
            })
            .catch(err => console.log(err));
    };
    

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/delete/${id}`)
            .then(result => {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="home">
            <h2>ToDo List</h2>
            <Create />
            {
                todos.length === 0
                    ? <div><h2>No Record</h2></div>
                    : todos.map(todo => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox' onClick={() => handleEdit(todo._id, todo.completed)}>
                                {todo.completed
                                    ? <BsCheckCircleFill className='icon' />
                                    : <BsCircleFill className='icon' />
                                }
                                <p className={todo.completed ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                            </div>
                        </div>
                    ))
            }
            <div className="credits">
                <p>© 2024 ToDo List. All rights reserved.</p>
                <p>Developed by Abhishikth Boda.</p>
            </div>
        </div>
    );
}

export default Home;
