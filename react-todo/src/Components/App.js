import React, { useState, useEffect } from 'react';
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.tasks'

function App() {
    // Initialise State
    const [newTask, setNewTask] = useState({});
    const [allTasks, setAllTasks] = useState([]);

    // Retrieve Tasks
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTasks) setAllTasks(prevTasks => [...prevTasks, ...storedTasks])
    }, [])

    // Store Tasks
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allTasks))
    }, [allTasks])
    
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

    // Hover Close Visibility


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
                            <button className='closeBtn' onClick={() => handleDelete(id)}>X</button>
                        </div>
                        {!description ? null : <p>{description}</p>}
                    </li>
                ))}
            </ul>
        </div> 
    );
}

export default App;
