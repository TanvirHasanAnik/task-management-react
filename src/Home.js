import React, {useState} from 'react';

export default function Home() {
    const [tasks, setTasks] = useState([
        {id: 1, text: "Task 1"},
        {id: 2, text: "Task 2"},
        {id: 3, text: "Task 3"},
        {id: 4, text: "Task 4"},
        {id: 5, text: "Task 5"},
    ]);
    return (
        <>
        <Heading title="Task Management"/>
        <TaskList tasks={tasks}/>
        <InputField setTasks = {setTasks} tasks = {tasks}/>
        </>
    );
}

function Heading({title}) {
    return (
        <h1>{title}</h1>
    );
}

function Task({id, text}){
    return (
        <li>{text}</li>
    );
}

function TaskList({tasks}) {
    return (
        <ul>
            {tasks.map(task => <Task key={task.id} text={task.text}/>)}
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