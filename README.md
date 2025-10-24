# Bolt Bucket — DIY Delight

Premium car customizer demo built for the Week 5 assignment. It includes a React frontend (Vite + Tailwind) and an Express + Postgres backend.

Project structure
- `server/` — Express API, Postgres pool, controllers, routes, and `config/reset.js` to create tables and seed data.
- `client/` — Vite + React app, Tailwind CSS, pages/components for customization UI.

Quick start
1. Install dependencies:

```bash
cd server
npm install
cd ../client
npm install
```

2. Configure Postgres in `server/.env` (see `server/.env.example`) with your Render/Postgres credentials. Then run the reset script to create tables and seed options:

```bash
cd server
# create .env based on .env.example, then run the reset once:
node ./config/reset.js --run
# start the server
node index.js
```

3. Start the client (in another terminal):

```bash
cd client
npm run dev
```

By default the frontend expects the backend at `http://localhost:4000/api`. Override with `VITE_API_BASE` if needed.

## Required & stretch features — implementation checklist

Required features

- [x] React frontend displays data from the API (client uses `axios` and `ItemsAPI` service).
- [x] Postgres database with `options` and `custom_items` tables created by `server/config/reset.js`.
- [x] Users can view option lists for different aspects (EXTERIOR, ROOF, WHEELS, INTERIOR) via `GET /api/options`.
- [x] Visual preview updates when options are selected (`VisualPreview` component).
- [x] The app displays the total price dynamically (`calcTotalPrice` in `client/src/utilities/calcPrice.js`).
- [x] Server-side validation prevents impossible combos (returns HTTP 400) in `server/controllers/customItemsController.js`.
- [x] Users can submit choices to save items (`POST /api/custom-items`).
- [x] Users can view the list of submitted items (`GET /api/custom-items`).
- [x] Users can edit and delete saved items (`PUT` and `DELETE` endpoints wired to UI).

Stretch features

- [x] Client-side prevention of incompatible options before submission (example `INCOMPATIBILITIES` map in `client/src/pages/CreateItem.jsx`).

## Proof artifacts (in this repo)

1) Database screenshot (shows `cars`/`custom_items` table with base_price = 67000):

![Database screenshot](client/assets/database.png)

2) Walkthrough recording (GIF):

![Walkthrough GIF](client/assets/bolt-bucket-web103.gif)

3) Reset log (proof the seed ran):

```
Seeded options
Reset complete
```

## How I verified end-to-end

- I executed `node server/config/reset.js --run` which created the `options` and `custom_items` tables and seeded example options.
- The server was started and the API endpoint `GET /api/options` returned seeded rows.
- The frontend (Vite) was started and exercised locally to create, edit, and delete items.

## Connect with TablePlus

To connect to the same Render Postgres instance in TablePlus use the credentials in `server/.env`:

- Host: `PGHOST` value from `server/.env`
- Port: `PGPORT` (usually `5432`)
- User: `PGUSER`
- Password: `PGPASSWORD`
- Database: `PGDATABASE`
- SSL/TLS: enable (Render requires SSL). If TablePlus asks about certificate validation you can allow self-signed/disable validation for testing.

If the connection succeeds you should see the `options` and `custom_items` tables.

## Remaining / optional improvements

- Tests & quality gates: add unit tests for `calcPrice` and an API smoke test (recommended next step).
- Visual polish: more realistic car option images, additional transitions, and accessible labels.

## Quick verification command

```bash
curl http://localhost:4000/api/options
```

---

If you'd like, I can also package this repository into a zip for submission or open a PR with a final commit message. Good luck — tell me if you'd like any final polish or tests expanded into a formal test runner (Jest/Vitest).

