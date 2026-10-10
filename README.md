# Pet-Platform

## NEST

```bash
pnpm dlx @nestjs/cli new apps/api --package-manager pnpm --skip-git
```

В apps/api/package.json добавить:

```json
"dev": "nest start --watch",
"check-types": "tsc --noEmit"
```

А в apps/web/package.json добавить:

```json
"check-types": "tsc --noEmit"
```

Затем:

```bash
pnpm install
turbo check-types
```

Запуск:

apps/web → Next.js
web → [http://localhost:3000]

```bash
pnpm --filter web dev
pnpm --filter web build
```

apps/api → NestJS
api → [http://localhost:3001]

```bash
pnpm --filter api dev
pnpm --filter api build
```

```bash
pnpm exec nest g resource <name>
pnpm exec nest g controller [name]
pnpm exec nest g service
pnpm exec nest g module
```

## PRISMA CLI 7

```bash
pnpm add prisma@7 dotenv
pnpm add @prisma/client@7 @prisma/adapter-pg
pnpm prisma init --datasource-provider postgresql
```

Prisma Client

```bash
pnpm add @prisma/client
pnpm add -D prisma
pnpm prisma generate
```

при изменении схеми

```bash
pnpm prisma migrate dev --name init
```

открыть Prisma Studio:

```bash
pnpm prisma studio
```

CONNECT EXISTING DATABASE:

1. Configure your DATABASE_URL in prisma7.config.ts
2. Run prisma db pull to introspect your database.

CREATE NEW DATABASE:
Local: npx prisma dev (runs Postgres locally in your terminal)
Cloud: npx create-db (creates a free Prisma Postgres database)

Then, define your models in prisma/schema.prisma and run prisma migrate dev to apply your schema.

Learn more: [h]ttps://pris.ly/getting-started

## Docker

Запусти PostgreSQL

```bash
docker compose up -d
```

## ValidationPipe

```bash
cd api
pnpm add class-validator class-transformer
```

## Authentication

```bash
pnpm add @nestjs/authentication
```
