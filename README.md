# PERN Stack Todo API

> A production-ready, Dockerized REST API for a Todo application built with Node.js, Express, TypeScript, Prisma 7, and PostgreSQL 15 — with JWT-based authentication and bcrypt password hashing.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Database Management](#database-management)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project provides a robust backend API for a Todo application. The entire environment — the Node.js server, PostgreSQL database, and all dependencies — is containerized using Docker. You can spin up a fully working development environment with a single command, requiring nothing more than Git and Docker Desktop on your machine.

**Key features:**

- Full user authentication with JWT access tokens and bcrypt password hashing
- Persistent PostgreSQL database managed via Prisma ORM with automated migrations
- Fully containerized with Docker Compose for zero-friction local setup
- Written in TypeScript for end-to-end type safety

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| ORM | Prisma 7 |
| Database | PostgreSQL 15 |
| Infrastructure | Docker & Docker Compose |
| Authentication | JSON Web Tokens (JWT) |
| Password Hashing | bcrypt |

---

## Prerequisites

You only need two tools installed on your machine:

- [Git](https://git-scm.com/)
- [Docker Desktop](https://docs.docker.com/get-docker/)

No Node.js, npm, or PostgreSQL installation is required locally.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Configure environment variables

An `.env.example` file is provided as a template. Copy it and fill in your values:

```bash
cp .env.example .env
```

See the [Environment Variables](#environment-variables) section for a full reference of required keys.

### 3. Start the environment

Build the Docker image, start the PostgreSQL container, run Prisma migrations, and boot the API server — all in one command:

```bash
docker-compose up -d --build
```

The API will be live at: **`http://localhost:80`**

---

## API Reference

**Base URL:** `http://localhost:80/api/v1`

All request and response bodies use `Content-Type: application/json`. Endpoints marked with 🔒 require a valid JWT in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

---

### Auth

#### `POST /user/signup`

Creates a new user account. The password is securely hashed with bcrypt before storage.

**Request body:**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "SecurePassword123!"
}
```

**Success response** `201 Created`:

```json
{
  "message": "User created successfully",
  "userId": "clx..."
}
```

---

#### `POST /user/signin`

Authenticates an existing user and returns a signed JWT for use in subsequent authorized requests.

**Request body:**

```json
{
  "email": "johndoe@example.com",
  "password": "SecurePassword123!"
}
```

**Success response** `200 OK`:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Todos 🔒

> Todo CRUD endpoints require a valid `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/get` | Retrieve all todos for the authenticated user |
| `POST` | `/create` | Create a new todo |
| `PUT` | `/update/:id` | Update an existing todo |
| `PUT` | `/updateTodo/:id` | Update an existing todo as completed |
| `DELETE` | `/delete/:id` | Delete a todo |

---

## Database Management

Because this project uses Docker volumes, your database data persists even after stopping the containers.

| Action | Command |
|---|---|
| Stop the server safely | `docker-compose down` |
| Stream backend logs | `docker logs node_backend -f` |
| Wipe the database entirely | `docker-compose down -v` |

> ⚠️ `docker-compose down -v` permanently deletes all data. Use only when a full reset is intentional.

---

## Project Structure

```
.
├── prisma/
│   ├── migrations/          # Auto-generated database schema changes
│   └── schema.prisma        # Prisma data models (User, Todo)
├── src/
│   ├── controllers/         # Business logic for each route
│   ├── routes/              # Express API route definitions
│   ├── middleware/          # JWT authentication guards
│   └── index.ts             # Express server entry point
├── .env.example             # Environment variable template
├── docker-compose.yml       # Orchestrates Node.js and PostgreSQL containers
├── Dockerfile               # Blueprint for the Node.js backend image
├── prisma.config.ts         # Prisma 7 build-time configuration
├── package.json
└── tsconfig.json
```

---

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string for Prisma | `postgresql://user:pass@db:5432/todos` |
| `JWT_SECRET` | Secret key used to sign and verify JWTs | `a-long-random-secret-string` |
| `PORT` | Port the Express server listens on | `80` |
| `POSTGRES_USER` | PostgreSQL username (used by Docker) | `admin` |
| `POSTGRES_PASSWORD` | PostgreSQL password (used by Docker) | `password` |
| `POSTGRES_DB` | PostgreSQL database name | `todos` |

---

## Contributing

Contributions are welcome. To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature-name`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## License

This project is licensed under the [MIT License](LICENSE).
