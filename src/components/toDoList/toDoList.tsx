import React, { useEffect, useState } from "react";
import { Task } from "../../types/Task";
import userTask from "../../hooks/TaskHook";

const TodoListApp = () => {

    const { tasks, addTask, deleteTask, statusTask, editTask, editingId, editingText, setEditingText } = userTask();
    const [newTask, setNewTask] = useState("");
    const handleAddTask = () => {
        addTask(newTask);
        setNewTask("");
    };
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

                            style={{ textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "gray" : "black" ,display: "flex"}}
                        >
                            {task.text}</span>
                    )}

                <i onClick={() => deleteTask(task.id)} className="bi bi-trash icon" style={{ color: "red" }} role="button"></i>
                <i onClick={() => editTask(task.id, task.text)} className="bi bi-pencil-square icon" style={{ color: "#FFB800" }} role="button"/>
                <i onClick={() => statusTask(task.id)} className="bi bi-check2-circle icon" style={{ color: "#05FF00" }} role="button"/>

            </li>
        )
    }
    return (
        <>
            <div >
                <h1 className="text">MY TO DO LIST</h1>
            </div>

            <div className="taskInput">
                <input type="text" id="taskName" value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddTask()} placeholder="New task..." />
                <button className="customBtn" onClick={handleAddTask} >Save</button>
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