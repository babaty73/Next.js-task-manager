# Next.js Task Manager — Backend Practice

This is a JavaScript-only Next.js App Router API for practicing backend concepts.
It uses an in-memory array rather than a database, so changes are temporary and
can disappear when the development server restarts.

## Put the files in your existing project

Copy these paths into your existing Next.js project:

- `app/api/tasks/route.js`
- `app/api/tasks/[id]/route.js`
- `lib/tasks.js`

The `@/lib/tasks` import assumes the default `@/*` alias. If you disabled or
changed the alias, replace that import with the correct relative path.

## Run it

From your Next.js project directory:

```bash
npm run dev
```

## Endpoints

| Method | URL | Purpose |
|---|---|---|
| GET | `/api/tasks` | List all tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/1` | Get task with ID `1` |
| PUT | `/api/tasks/1` | Update its title and/or completed status |
| DELETE | `/api/tasks/1` | Delete task with ID `1` |

## Test with curl

List tasks:

```bash
curl http://localhost:3000/api/tasks
```

Create a task:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"Practice backend"}'
```

Get one task:

```bash
curl http://localhost:3000/api/tasks/1
```

Update a task:

```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H 'Content-Type: application/json' \
  -d '{"completed":true,"title":"Practice Next.js backend"}'
```

Delete a task:

```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

## Suggested learning order

1. Read `lib/tasks.js`: understand the data shape.
2. Read `app/api/tasks/route.js`: trace GET, then POST.
3. Read `app/api/tasks/[id]/route.js`: trace GET, then PUT, then DELETE.
4. Test each endpoint before changing anything.
5. Break one route file at a time and rewrite it without looking.
6. Test again and explain the request → logic → response flow aloud.

## Important concepts

- `request.json()` reads and parses a JSON request body.
- `NextResponse.json(...)` returns a JSON HTTP response.
- HTTP status `201` means a resource was created.
- HTTP status `400` means the client sent invalid input.
- HTTP status `404` means the requested task does not exist.
- `[id]` is a dynamic route segment.
- In current Next.js versions, `params` is asynchronous, so the handlers use `await params`.
- This is practice code, not production-ready storage. The in-memory array is not persistent and is not shared reliably across multiple server instances.
