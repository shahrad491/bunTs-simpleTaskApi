export function notFound(message = "Not found"): Response {
  return Response.json({ error: message }, { status: 404 });
}

export function parseId(raw: String): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function readJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return undefined;
  }
}

export function badRequest(message: String = "Bad Request"): Response {
  return Response.json({ error: message }, { status: 400 });
}
