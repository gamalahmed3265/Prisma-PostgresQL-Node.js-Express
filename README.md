"# Prisma-PostgresQL-Node.js-Express" 

# install
```bash
    npm i express nodemon dotenv
```

# Init Prisma Datasource Provider Postgresql
```bash
    npx prisma init --datasource-provider postgresql
```
# install Clint Prisma
```bash
    npm install @prisma/client
```
# Generate Prisma Model
```bash
    npx prisma generate
```
# Migration Prisma Model
```bash
    npx prisma migrate dev --name init --create-only
```
# Deploy Database Table
```bash
    npx prisma migrate deploy
```