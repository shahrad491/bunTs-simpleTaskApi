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
