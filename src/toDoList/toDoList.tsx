import React, { useEffect, useState } from "react";
import { Task } from "./Task";


const TodoListApp = () => {
    const [tasks, setTasks] = useState<Task[]>(
        JSON.parse(localStorage.getItem("tasks") || "[]")
    );
    const [newTask, setNewTask] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks]);
    const addTask = () => {
        if (!newTask.trim()) {
            return (
                alert("Please enter task!!!")
            )
        }
        const task: Task = {
            id: Date.now() + Math.random(),
            text: newTask,
            completed: false
        };
        setTasks([task, ...tasks]);
        setNewTask("");
        // console.log(tasks);
    }
    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }
    const editTask = (id: number, text?: string) => {
        if (editingId == id) {
            setTasks(
                tasks.map((task) =>
                    task.id === id ? { ...task, text: editingText } : task
                )
            )
            setEditingId(null);
        } else {
            setEditingId(id);
            setEditingText(text || "");
        }

    }
    const statusTask = (id: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }
    const completedTask = tasks.filter(task => task.completed).length;
    const progressTask = tasks.length - completedTask;
    const renderTask = (task: Task) => {
        return (
            <li key={task.id} className="taskItem">
                {
                    editingId === task.id ? (
                        <input type="text" value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onBlur={() => editTask(task.id)}
                            onKeyDown={(e) => e.key === "Enter" && editTask(task.id)}
                            autoFocus />
                    ) : (
                        <span
                            className={task.completed ? "completed" : ""}
                            
                            style={{ textDecoration: task.completed ? "line-through" : "none", color:task.completed ? "gray":"black"}}
                        >
                            {task.text}</span>
                    )}
                
                <i onClick={() => deleteTask(task.id)} className="bi bi-trash icon" style={{color:"red"}}></i>
                <i onClick={() => editTask(task.id, task.text)} className="bi bi-pencil-square icon"  style={{color:"#FFB800"}}/>
                <i onClick={() => statusTask(task.id)} className="bi bi-check2-circle icon" style={{color:"#05FF00"}}/>

            </li>
        )
    }
    return (
        <>
            <div >
                <h1 className="text">MY TO DO LIST</h1>
            </div>
            
            <div className="taskInput">
                <input type="text" id="taskName" value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTask()} placeholder="New task..." />
                <button className="customBtn" onClick={addTask} >Save</button>
            </div>
            <div className="content">
            <div className="taskStatus">
                <div className="taskStatusItem"><p className="text" >Done: {completedTask}</p></div>
                <div className="taskStatusItem"><p className="text">In Progress: {progressTask}</p></div>
            </div>
                <ul className='taskList'>
                    {tasks.map(renderTask)}
                </ul>

            </div>

        </>
    );
}
export default TodoListApp;