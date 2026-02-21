# Forest Game Backend

## Description

Backend API built with NestJS, Prisma ORM and PostgreSQL. This project manages game entities such as players, stands and questions.

## Tech Stack

- NestJS
- Prisma ORM
- PostgreSQL
- TypeScript

## Installation

1. **Clone repository**

```bash
git clone <repo-url>
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file:

```env
DATABASE_URL="postgresql://forest_user:password@localhost:5432/forest_game"
```

4. **Run database migrations**

```bash
npx prisma migrate dev
```

5. **Start development server**

```bash
npm run start:dev
```

## Database

Migrations are stored in:

```
prisma/migrations/
```

To open database UI:

```bash
npx prisma studio
```
