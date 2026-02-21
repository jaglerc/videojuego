# Forest Game

Proyecto completo del juego Forest Game compuesto por:

- **Backend** — NestJS (TypeScript) + Prisma + PostgreSQL
- **Frontend** — React + Vite (JavaScript)

---

# Backend

## Tecnologías

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Node.js

## Requisitos Previos

Instalar previamente:

- **Node.js** (LTS recomendado) — https://nodejs.org/
- **PostgreSQL** — https://www.postgresql.org/download/

Verificar instalación:

```bash
node -v
psql --version
```

## Configuración de PostgreSQL

### Iniciar el servicio

**Linux (systemd)**

```bash
sudo systemctl start postgresql
```

**Mac (Homebrew)**

```bash
brew services start postgresql
```

**Windows**

PostgreSQL se ejecuta automáticamente como servicio después de instalarlo. Puedes verificarlo en:

- Panel de Servicios → PostgreSQL
- O desde pgAdmin conectándote al servidor.

### Crear base de datos y usuario

Abrir PostgreSQL:

**Linux / Mac**

```bash
sudo -iu postgres psql
```

**Windows**

Abrir: SQL Shell (psql)

Ejecutar:

```sql
CREATE DATABASE forest_game;
CREATE USER forest_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE forest_game TO forest_user;
ALTER USER forest_user CREATEDB;

\c forest_game
GRANT ALL ON SCHEMA public TO forest_user;
ALTER SCHEMA public OWNER TO forest_user;

\q
```

## Instalación del Backend

1. **Clonar repositorio**

```bash
git clone <repo-url>
cd backend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` dentro de `backend/`:

```env
DATABASE_URL="postgresql://forest_user:password@localhost:5432/forest_game"
```

## Ejecutar Migraciones

```bash
npx prisma migrate dev
```

Este comando:

- Crea archivos de migración
- Aplica los cambios a la base de datos
- Genera el cliente Prisma

## Iniciar Backend en desarrollo

```bash
npm run start:dev
```


## Administración de Base de Datos

Abrir Prisma Studio:

```bash
npx prisma studio
```

### Comandos útiles de PostgreSQL

Dentro de `psql`:

| Comando | Descripción |
|---|---|
| `\l` | Listar bases de datos |
| `\c forest_game` | Conectarse a una base |
| `\dt` | Listar tablas |
| `\d nombre_tabla` | Describir tabla |
| `\dn` | Listar esquemas |
| `\df` | Listar funciones |
| `\q` | Salir |

## Solución de Problemas

Si ocurre error de conexión:

- Verificar que PostgreSQL esté en ejecución
- Confirmar que `DATABASE_URL` tenga credenciales correctas
- Verificar que el puerto `5432` esté disponible
- Confirmar que la base de datos fue creada correctamente
- Ejecutar nuevamente las migraciones

---

# Frontend — React + Vite

El frontend está creado con React usando Vite y JavaScript. Se encuentra en la carpeta `frontend/`.

## Instalación del Frontend

1. **Ir a la carpeta frontend**

```bash
cd frontend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Ejecutar en desarrollo**

```bash
npm run dev
```

 `http://localhost:5173`.
