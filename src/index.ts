import { createTask, listTasks } from "./store.ts";
import type { TaskFields } from "./types.ts";

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
  },
  fetch() {
    return Response.json({ error: "not found" }, { status: 404 });
  },
});

console.log(`Bun server is running at ${server.url}`);
