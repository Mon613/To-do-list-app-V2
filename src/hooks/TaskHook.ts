import { useEffect, useState } from "react";
import { Task } from "../types/Task";
import { getTasks, saveTasks } from "../services/TaskService";

const userTask = () => {
    const [tasks, setTasks] = useState<Task[]>(getTasks());
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const addTask = (text: string) => {
        if (!text.trim()) {
            return (
                alert("Please enter task!!!")
            )
        }
        const newTask: Task = {
            id: Date.now() + Math.random(),
            text,
            completed: false
        };
        setTasks([newTask, ...tasks]);
    };

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

    return {
        tasks,
        addTask,
        deleteTask,
        statusTask,
        editTask,
        editingId,
        editingText,
        setEditingText
    };
}
export default userTask;