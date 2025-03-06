import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
        const taskName = tasks.find(task => task.id === id).text;
        setTasks(newTasks);
        (() => toast.error("Task: " +taskName+ " has been removed successfully!"))();
    }

    return (
        <>
        <ToastContainer />
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
        <li>{task.text} <EditTask/> <RemoveTask id={task.id} onRemoveTask={removeTask}/></li>
    );
}

function RemoveTask({id,onRemoveTask}){
    return (
        <button onClick={() => {
            onRemoveTask(id);
        }}>X</button>
    );
}

function EditTask({id,onEditTask}){
    return (
        <button onClick={() => {
            onEditTask(id);
        }}>Edit</button>
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
        (() => toast.success("Task: "+task+" added successfully!"))();
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