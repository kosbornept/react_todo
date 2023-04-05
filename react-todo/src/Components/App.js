import React, { useState } from 'react';
import './App.css';

function App() {
    // Initialise State
    const [newTask, setNewTask] = useState({});
    const [allTasks, setAllTasks] = useState([]);

    
    // Get value from input and update task state
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setNewTask(prevstate => ({ ...prevstate, id: Date.now(), [name]: value }));
    }

    // Push task into array and reset state
    const handleSubmit = (event) => {
        event.preventDefault();
        if(!newTask.title) return;
        setAllTasks((prev) => [newTask, ...prev]);
        setNewTask({});
    }

    // Delete Task
    const handleDelete = (taskId) => {
        setAllTasks((prev) => prev.filter((task) => task.id !== taskId));
    }

    return (
        <div className="App">
            <h1>Task List</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    name="title"
                    placeholder='New Task'
                    value={newTask.title || ""}
                    onChange={handleChange}
                />
                {!newTask.title ? null : (
                    <>
                        <textarea
                            name='description'
                            placeholder='task details...'
                            value={newTask.description || ""}
                            onChange={handleChange}
                        />
                        <button type='submit'>Add Task</button>
                    </>
                )}
            </form>
            <ul>
                {allTasks.map(({ title, description, id }) => (
                    <li key={id}>
                        <div>
                            <h2>{title}</h2>
                            <button onClick={() => handleDelete(id)}>X</button>
                        </div>
                        {!description ? null : <p>{description}</p>}
                    </li>
                ))}
            </ul>
        </div> 
    );
}

export default App;
