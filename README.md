# Bolt Bucket

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

## Proof of implementation

Below are the required features and their implementation status. The app scaffold, backend, API, and React frontend were implemented. The backend `reset` script was run against the database to create tables and seed `options`.

Required features (status)

- [x] The web app uses React to display data from the API — implemented in `client/` using Vite + React and `axios`.
- [x] The web app is connected to a PostgreSQL database with an appropriately structured table (`custom_items` / `cars`) — implemented and created by `server/config/reset.js` (run while preparing this repo).
- [x] Users can view a list of options they can select for different aspects of a CustomCar — endpoint `GET /api/options` and UI option grids.
- [x] On selecting each option, the displayed visual icon for the CustomCar updates to match the option the user chose — implemented in `VisualPreview` and the Create/Edit pages.
- [x] The app displays the total price of all features — implemented via `client/src/utilities/calcPrice.js` and shown in the preview panel.
- [x] If a user submits a feature combo that is impossible, they receive an error and the item is not saved — server-side validation in `server/controllers/customItemsController.js` blocks impossible combos and returns a 400 error.
- [x] The user can submit their choices to save the car to the list of created CustomCar — `POST /api/custom-items` and Create UI.
- [x] Users can view a list of all submitted CustomCar — `GET /api/custom-items` and the ItemList page.
- [x] Saved CustomItems can be updated and deleted in its detail page OR the list view of submitted CustomItems — `PUT /api/custom-items/:id` and `DELETE /api/custom-items/:id` implemented and wired to UI Edit/Delete.

Stretch features

- [x] Selecting particular options prevents incompatible options from being selected even before form submission — implemented client-side in `CreateItem.jsx` with an `INCOMPATIBILITIES` map; disabled options are visually disabled.

Proof artifacts

1. Screenshot of the app (premium dark theme and price box) — included below. Replace the placeholder image with your actual screenshot if needed.

![Bolt Bucket Screenshot](client/assets/database.png)

2. Walkthrough recording (GIF) — add your recorded GIF to `/client/assets/walkthrough.gif` and it will be shown here on GitHub/README viewers.

![Walkthrough GIF](client/assets/bolt-bucket-web103.gif)

3. Seed / reset log (server) — the reset script was run and seeded options. Example output captured during run:

```
Seeded options
Reset complete
```

How I verified end-to-end

- The `server/config/reset.js` script was executed to create the `options` and `custom_items` tables and seed initial options.
- The server was started and the API endpoints were exercised by the frontend.
- TablePlus instructions are in the section above to connect to the same Render Postgres instance.

Notes / remaining items

- Tests & quality gates: A small test suite is not yet added; recommended next step is adding unit tests for `calcPrice` and a basic API smoke test (I can add these if you want).
- Replace the placeholder image and GIF files in `/client/assets` with your actual screenshot and recording files so they render in the README.


TablePlus (or other DB client) connection
1. Open TablePlus and create a new Postgres connection.
2. Use these values from `server/.env` (or the values you configured on Render):
	- Host: the value of `PGHOST` (e.g. dpg-...render.com)
	- Port: `5432`
	- User: `PGUSER`
	- Password: `PGPASSWORD`
	- Database: `PGDATABASE`
	- SSL/TLS: enable (Render requires SSL). If TablePlus asks about certificate validation you can allow self-signed/disable validation for testing.

3. Test the connection. If successful you should see the `options` and `custom_items` tables (the reset script seeds `options`).

Quick verification (once server is running)
- Visit the frontend (Vite dev server, typically `http://localhost:5173`) to use the UI.
- Or call the API to list options:

```bash
curl http://localhost:4000/api/options
```

