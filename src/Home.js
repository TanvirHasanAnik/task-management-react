import React, { useReducer } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    function handleAddTask(text){
        dispatch({
            type: "add",
            id: Date.now(),
            text: text,
        });
        toast.success("Task: " + text + " has been added");
    }

    function handleRemoveTask (taskId) {
        dispatch({
            type: "remove",
            id: taskId,
        });
        toast.error("Task: " +tasks.find(task => task.id === taskId).text+ " has been removed successfully!");
    }

    function handleEditTask(taskId, newText){
        dispatch({
            type: "edit",
            id: taskId,
            text:newText,
        });
        toast.info("Task: " + newText + " has been updated successfully!");
    }

    return (
        <>
        <ToastContainer />
        <Heading title="Task Management"/>
        <TaskList tasks={tasks} removeTask={handleRemoveTask} editTask={handleEditTask}/>
        <InputField addTask = {handleAddTask}/>
        </>
    );
}

function Heading({title}) {
    return (
        <h1>{title}</h1>
    );
}

function Task({task, removeTask, editTask}) {
    return (
        <li className='task' key={task.id}>
            <span contentEditable="true" onBlur={(e) => {task.text !== e.target.innerText && editTask(task.id, e.target.innerText)}}>{task.text}</span>
            <RemoveTask id={task.id} onRemoveTask={removeTask} />
        </li>
    );
}

function RemoveTask({id,onRemoveTask}){
    return (
        <button className = "button--delete" onClick={() => {
            onRemoveTask(id);
        }}>X</button>
    );
}

function TaskList({tasks, removeTask, editTask}) {
    return (
        <ul>
            {tasks.map(task => <Task task = {task} removeTask={removeTask} editTask = {editTask}/>)}
        </ul>
    )
}

function InputField({addTask}) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const value = e.target.addText.value;
            value && addTask(value);
            e.target.addText.value = "";
            }}>
            <input 
            type="text" 
            name="addText"
            />
            <button className = "button-add" type="submit">Add</button>
        </form>
    );
}

function tasksReducer(tasks, action){
    switch (action.type) {
        case 'add': {
            return [...tasks,
                {
                    id: action.id,
                    text: action.text
                }
            ];
        }

        case 'edit': {
            const targetTask = tasks.find(task => task.id === action.id);
            if(targetTask.text !== action.text) {
                const newTasks = tasks.map(task => 
                    task.id === action.id ? { ...task, text: action.text } : task
                );
                return newTasks;
            }else {
                return tasks;
            }
        }

        case 'remove': {
                return tasks.filter(task => task.id !== action.id);
        }

        default: {
            throw Error('Unknown action: '+ action.type);
        }
    }
};


const initialTasks = [
    {id: 1, text: "Task 1"},
    {id: 2, text: "Task 2"},
    {id: 3, text: "Task 3"},
    {id: 4, text: "Task 4"},
    {id: 5, text: "Task 5"},
];