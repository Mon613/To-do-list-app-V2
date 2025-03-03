import { Task } from "../types/Task";

const TASK_STORAGE_KEY = "tasks";

export const getTasks = (): Task[] => {
    return JSON.parse(localStorage.getItem(TASK_STORAGE_KEY) || "[]");
};

export const saveTasks = (tasks: Task[]): void => {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
};
