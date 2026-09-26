# benstack-v1

A minimal tech stack for full stack web development that tries to strike a balance between using popular, modern, and minimal tooling. Created and used by BenStack.

## Getting started:
To get started, clone this repo and run `pnpm install` inside the root directory. You also may want to rename the package name in the root `package.json` to your project's name.

Create a `.env`, and use `.env.example` as a guide for the necessary environemnt variables to define. `.gitignore` is already configured to ignore `.env`.

## Development:
```
# Start development (both web and api)
pnpm run dev

# Start web app (frontend)
pnpm run dev:web

# Start api app (backend)
pnpm run dev:api

# Build both web and api apps
pnpm run build

# Build web app
pnpm run build:web

# Build api app
pnpm run build:api

# Generate database
pnpm run db:generate

# Push database
pnpm run db:push

# Migrate database
pnpm run db:migrate

# Open database in Drizzle Studio
pnpm run db:studio

# Build shared package
pnpm run shared:build

# Compose database dev container
pnpm run docker-dev:up

# Decompose database dev container
pnpm run docker-dev:down
```

## Stack contents:
| App | Description |
|-----|-------------|
| `web` | A basic React + Vite app (includes Tailwind for styles) |
| `api` | Hono app with PostgreSQL database running under Drizzle ORM |

| Packages | Description |
|----------|-------------|
| `shared` | Zod schemas and types |

## Project structure:
```
.
├── apps/
│	├── api/                # Hono project for backend
│   │ └── db/			    # Postgres database client with Drizzle ORM config
│	└── web/				# React + Vite project for frontend
├── packages/		        # Layer between web and api apps for HTTP fetches					
│	└── shared/			    # Schemas and types (Zod and/or TS)
├── .env.example		    # Example .env file with required variables
├── .gitignore
├── package.json			# Root package.json with run script definitions
├── pnpm-workspace.yaml		# pnpm workspace configurations
├── README.md					
└── tsconfig.json		    # Root tsconfig.json 
```

## Upcoming features:
- Integration with turborepo?
