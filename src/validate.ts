import { TASK_STATUSES, type TaskFields, type TaskStatus } from "./types.ts";

export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isTaskStatus(value: unknown): value is TaskStatus {
  return (
    typeof value === "string" &&
    (TASK_STATUSES as readonly string[]).includes(value)
  );
}

export function parseTaskFields(input: unknown): Result<TaskFields> {
  if (!isObject(input))
    return { ok: false, error: "Body must be a valid JSON object" };

  const { title, description = "", status = "todo" } = input;
  if (typeof title !== "string" || title.trim() === "")
    return {
      ok: false,
      error: "title is required string and may not be empty",
    };

  if (typeof description !== "string") {
    return { ok: false, error: "description must be a string" };
  }

  if (!isTaskStatus(status)) {
    return {
      ok: false,
      error: `status must be one of: ${TASK_STATUSES.join(", ")}`,
    };
  }

  return {
    ok: true,
    value: { title: title.trim(), description, status },
  };
}

export function parseTaskPatch(input: unknown): Result<Partial<TaskFields>> {
  if (!isObject(input))
    return { ok: false, error: "Body must be a valid JSON object" };

  const patch: Partial<TaskFields> = {};

  if ("title" in input) {
    if (typeof input.title !== "string" || input.title.trim() === "")
      return {
        ok: false,
        error: "title is required string and may not be empty",
      };
    patch.title = input.title.trim();
  }

  if ("description" in input) {
    if (typeof input.description !== "string") {
      return { ok: false, error: "description must be a string" };
    }
    patch.description = input.description;
  }

  if ("status" in input) {
    if (!isTaskStatus(input.status)) {
      return {
        ok: false,
        error: `status must be one of: ${TASK_STATUSES.join(", ")}`,
      };
    }
    patch.status = input.status;
  }
  return { ok: true, value: patch };
}
