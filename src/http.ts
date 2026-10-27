export function notFound(message = "Not found"): Response {
  return Response.json({ error: message }, { status: 404 });
}

export function parseId(raw: String): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}
