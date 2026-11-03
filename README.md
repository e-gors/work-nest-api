# Application Setup

1. Install all libraries

```bash
npm install
```

2. Copy and past env file

```bash
cp .env.example .env
```

3. Run application on local

```bash
npm run start:dev
```

4. Run the database migrations:

```bash
npm run migration:run
```

5. Seed the database with sample data:

```bash
npm run seed
```

# Migration Setup

1. Create migration without entities

```bash
npm run migration:create -- TableName
```

2. If you already have entities and want to generate a migration:

```bash
npm run migration:generate -- src/common/database/migrations/TableName
```

The name after the path is the migration name. If you are starting from scratch, you can also create a migration manually in the same folder.

3. Revert migrations

```bash
npm run migration:revert
```
