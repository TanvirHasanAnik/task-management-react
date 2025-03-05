import React, { useState } from 'react';

export default function Home() {
    const [tasks, setTasks] = useState([
        {id: 1, text: "Task 1"},
        {id: 2, text: "Task 2"},
        {id: 3, text: "Task 3"},
        {id: 4, text: "Task 4"},
        {id: 5, text: "Task 5"},
    ]);

    const removeTask = (id) => {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
    }

    return (
        <>
        <Heading title="Task Management"/>
        <TaskList tasks={tasks} removeTask={removeTask}/>
        <InputField setTasks = {setTasks} tasks = {tasks}/>
        </>
    );
}

function Heading({title}) {
    return (
        <h1>{title}</h1>
    );
}

function Task({task, removeTask}){
    return (
        <li>{task.text} <RemoveTask id={task.id} onRemoveTask={removeTask}/></li>
    );
}

function RemoveTask({id,onRemoveTask}){
    return (
        <button onClick={() => {
            onRemoveTask(id);
        }}>X</button>
    );
}

function TaskList({tasks, removeTask}) {
    return (
        <ul>
            {tasks.map(task => <Task task = {task} removeTask={removeTask}/>)}
        </ul>
    )
}

function InputField({setTasks, tasks}) {
    const [task, setTask] = useState("");

    const addTask = (event) => {
        event.preventDefault();
        const newTasks = [...tasks, { id: Date.now(), text: task }];
        setTasks(newTasks);
        setTask("");
    }

    return (
        <>
        <form onSubmit={addTask}>
            <input 
            type="text" 
            name="addText"
            value={task}
            onChange={e => setTask(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
        </>
    );
}