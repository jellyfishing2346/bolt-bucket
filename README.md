# DIY Delight — Starter scaffold

This workspace contains a small scaffold for the Week 5 Project: DIY Delight.

Structure
- server/: Express backend (Postgres pool, routes, controllers, reset script)
- client/: Vite + React frontend (pages, components, services)

Quick start
1. Install dependencies for server and client:

```bash
cd server
npm install
cd ../client
npm install
```

2. Configure Postgres in `server/.env` (see `.env.example`). Then run the reset script to create tables and seed options:

```bash
cd server
# create .env based on .env.example, then:
node ./config/reset.js --run
npm run dev
```

3. Run the client:

```bash
cd client
npm run dev
```

Notes
- Fill `server/.env` with your Render Postgres connection info before running reset.
- The frontend expects the backend at `http://localhost:4000/api`. You can change this with `VITE_API_BASE`.
