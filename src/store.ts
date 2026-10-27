import { notFound } from "./http.ts";
import type { Task, TaskFields } from "./types.ts";

const tasks: Task[] = [];
let nextId = 1;

export function createTask(fields: TaskFields): Task {
  const task: Task = {
    id: nextId++,
    ...fields,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);

  return task;
}

export function listTasks(): Task[] {
  return tasks;
}

export function getTask(id: number): Task | null {
  return tasks.find((task) => task.id === id) ?? null;
}

export function deleteTask(id: number): boolean {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

export function updateTask(id: number, fields: TaskFields): Task | null {
  const task = getTask(id);
  if (!task) return null;

  Object.assign(task, fields);
  return task;
}
