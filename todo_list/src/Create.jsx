import React, { useState } from 'react';
import axios from 'axios';

function Create() {
    const [task, setTask] = useState('');
    const maxChars = 100;

    const handleAdd = () => {
        if (task.trim() === '') {
            alert('Task cannot be empty');
            return;
        }

        axios.post('http://localhost:3000/add', { task: task })
            .then(result => {
                location.reload(); 
            })
            .catch(err => console.log(err));
    };

    const handleChange = (e) => {
        if (e.target.value.length <= maxChars) {
            setTask(e.target.value);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className="create_form">
            <input
                type="text"
                placeholder="Enter the task you want"
                value={task}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;
