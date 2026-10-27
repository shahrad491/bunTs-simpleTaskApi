import {
  createTask,
  listTasks,
  deleteTask,
  updateTask,
  getTask,
} from "./store.ts";
import type { TaskFields } from "./types.ts";
import { notFound, parseId } from "./http.ts";

const server = Bun.serve({
  port: Number(Bun.env.PORT ?? 3000),
  routes: {
    "/health": () => Response.json({ ok: true, bun: Bun.version }),

    "/api/tasks": {
      GET: () => Response.json(listTasks()),
      POST: async (req) => {
        const body = (await req.json()) as TaskFields;

        const task = createTask({
          title: body.title,
          description: body.description,
        });
        return Response.json(task, { status: 201 });
      },
    },

    "/api/tasks/:id": {
      GET: (req) => {
        const id = parseId(req.params.id);
        const task = id ? getTask(id) : null;
        return task ? Response.json(task) : notFound("Task not found");
      },
      PUT: async (req) => {
        const id = parseId(req.params.id);
        if (!id) return notFound("Task not found");
        const body = (await req.json()) as TaskFields;
        const res = updateTask(id, body);

        return res ? Response.json(res) : notFound("Task not found");
      },
      DELETE: (req) => {
        const id = parseId(req.params.id);
        const task = id ? deleteTask(id) : null;
        if (!task) return notFound("Task not found");
        return new Response(null, { status: 204 });
      },
    },
  },
  fetch() {
    return Response.json({ error: "not found" }, { status: 404 });
  },
});

console.log(`Bun server is running at ${server.url}`);
