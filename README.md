# Bun Task API (TypeScript)

A tiny task-management REST API built while learning **Bun** and **TypeScript**. It uses Bun's built-in HTTP server (`Bun.serve`) and its route-based API — no Express, no database, no extra runtime dependencies.

> ⚠️ **Note:** Tasks are stored in memory, so every server restart starts with an empty list. This is a learning project, not a production service.

## Features

- 🚀 Built with `Bun.serve()` and declarative routes (`/api/tasks/:id`)
- 🧩 Small, single-purpose modules (routing, storage, validation, HTTP helpers)
- ✅ Runtime request validation with typed results
- 🏷️ Fully typed task model (`Task`, `TaskStatus`, `TaskFields`)
- 🌱 Zero-config environment loading — Bun reads `.env` automatically
- 🔥 Hot reload in development via `bun --watch`

## Tech Stack

| Tool | Purpose |
| --- | --- |
| [Bun](https://bun.com) | Runtime, package manager, and HTTP server |
| TypeScript | Type safety (strict mode) |
| `Bun.serve()` | Routing and request handling |

## Project Structure

```
.
├── src/
│   ├── index.ts      # Server setup and route definitions
│   ├── store.ts      # In-memory task storage (CRUD)
│   ├── validate.ts   # Request body validation
│   ├── http.ts       # Response helpers (404, 400, JSON parsing)
│   └── types.ts      # Task types and allowed statuses
├── apiResource/
│   └── bun task api type script.yaml  # OpenAPI description of the API
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- [Bun](https://bun.com/docs/installation) v1.4+ installed

### Installation

```bash
bun install
```

### Configuration

Create a `.env` file in the project root (optional — defaults to port `3000`):

```env
PORT=3600
```

### Run

```bash
# Development (auto-restarts on file changes)
bun run dev

# Or run directly
bun run src/index.ts
```

The server will log its address, e.g. `Bun server is running at http://localhost:3600/`.

### Type checking

```bash
bun run typecheck
```

## API Reference

Base URL: `http://localhost:3600` (or whatever `PORT` is set to)

### Task object

```json
{
  "id": 1,
  "title": "Write README",
  "description": "Explain the project",
  "status": "todo",
  "createdAt": "2026-10-28T09:15:00.000Z"
}
```

Allowed `status` values: `todo`, `in_progress`, `done` (defaults to `todo`).

### Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | Health check; returns `{ ok, bun }` |
| `GET` | `/api/tasks` | List all tasks |
| `POST` | `/api/tasks` | Create a task |
| `GET` | `/api/tasks/:id` | Get a single task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Examples

**Health check**

```bash
curl http://localhost:3600/health
```

```json
{ "ok": true, "bun": "1.4.4" }
```

**Create a task**

```bash
curl -X POST http://localhost:3600/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write README", "description": "Explain the project"}'
```

Returns `201 Created` with the new task.

**List tasks**

```bash
curl http://localhost:3600/api/tasks
```

**Get one task**

```bash
curl http://localhost:3600/api/tasks/1
```

**Update a task**

```bash
curl -X PUT http://localhost:3600/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Write a great README", "description": "Done", "status": "done"}'
```

`PUT` replaces the task fields, so `title` is required.

**Delete a task**

```bash
curl -X DELETE http://localhost:3600/api/tasks/1
```

Returns `204 No Content` on success.

## Validation Rules

Request bodies are validated before touching the store:

- `title` — required, non-empty string (trimmed)
- `description` — optional string (defaults to `""`)
- `status` — optional, must be one of `todo`, `in_progress`, `done`
- Invalid JSON or non-object bodies return `400 Bad Request`
- Unknown or non-numeric IDs return `404 Not Found`

Error responses look like:

```json
{ "error": "status must be one of: todo, in_progress, done" }
```

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the server with file watching |
| `bun run src/index.ts` | Start the server once |
| `bun run typecheck` | Run the TypeScript compiler without emitting files |

## Status Codes

| Code | Meaning |
| --- | --- |
| `200` | Success |
| `201` | Task created |
| `204` | Task deleted (no body) |
| `400` | Invalid request body |
| `404` | Task or route not found |

## Roadmap / Ideas

- [ ] Persist tasks with `bun:sqlite`
- [ ] Add `PATCH /api/tasks/:id` for partial updates (validator already exists in `validate.ts`)
- [ ] Pagination and filtering by status
- [ ] Automated tests with `bun test`
- [ ] Serve the OpenAPI spec / Swagger UI

## License

No license has been added yet.
