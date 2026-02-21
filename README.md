# Forest Game Backend

## Descripción

API Backend construida con NestJS, Prisma ORM y PostgreSQL. Este proyecto gestiona entidades del juego como jugadores (players), stands y preguntas.

## Tecnologías

- NestJS
- Prisma ORM
- PostgreSQL
- TypeScript
- Node.js

## Requisitos

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

PostgreSQL se ejecuta como servicio automáticamente después de instalarlo. Puedes verificarlo en:

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

## Instalación del Proyecto

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

Crear un archivo `.env` dentro de la carpeta backend:

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
- Genera el cliente de Prisma

## Iniciar servidor en desarrollo

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
| `\d nombre_tabla` | Describir una tabla |
| `\q` | Salir |

## Solución de Problemas

Si ocurre un error de conexión:

- Verificar que PostgreSQL esté en ejecución
- Confirmar que `DATABASE_URL` tenga credenciales correctas
- Verificar que el puerto `5432` esté disponible
- Confirmar que la base de datos fue creada correctamente
