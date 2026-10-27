export type Task = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
};

export type TaskFields = Pick<Task, "title" | "description">;
