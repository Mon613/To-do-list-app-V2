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
    const renderTask = (task: Task) => {
        return (
            <li key="task.id" className="taskItem">
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
                            onClick={() => editTask(task.id, task.text)}
                            style={{ textDecoration: task.completed ? "line-through" : "none" }}
                        >
                            {task.text}</span>
                    )}
                <button className="customBtn" onClick={() => statusTask(task.id)}>{task.completed ? "Undo" : "Done"}</button>
                <button className="customBtn" onClick={() => deleteTask(task.id)}><i className="bi bi-trash"></i></button>

            </li>
        )
    }
    return (
        <>
            <div>
                <h1>Tasks Management</h1>
            </div>
            <div className="taskInput">
                <input type="text" id="taskName" value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTask()} placeholder="Thêm tác vụ..." />
                <button className="customBtn" onClick={addTask} >Add</button>
            </div>
            <div className="content">
                <ul className='taskList'>
                    {tasks.map(renderTask)}
                </ul>

            </div>

        </>
    );
}
export default TodoListApp;