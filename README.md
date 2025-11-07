# Stock Tracker – Monorepo (Backend serves Frontend)

This project contains a Vite + React frontend and an Express + MongoDB backend. The backend serves the built frontend so you can deploy as a single service.

## Folder structure
- `frontend/` – React app (Vite, Tailwind v4)
- `backend/` – Express API + static hosting for the built frontend

## Prerequisites
- Node.js 20+
- MongoDB (local or MongoDB Atlas)

## Environment variables (Backend)
Create `backend/.env` (or set them in your environment):

```
MONGO_URI=
JWT_SECRET=
PORT=5000
```

## Quick start (single-unit serve)
The backend will serve the frontend after a build.

1) Build the frontend into `backend/public`:
```
cd frontend
npm install
npm run build
```

2) Start the backend (serves UI + API):
```
cd ../backend
npm install
npm start
```

3) Open the app:
```
http://localhost:5000
```

## Development (run separately with hot reload)
- Backend API:
```
cd backend
npm install
npm start
```
- Frontend (Vite dev server):
```
cd frontend
# If your backend is not on http://localhost:5000, set VITE_API_URL before dev
# PowerShell example: $env:VITE_API_URL='http://localhost:5000'
npm install
npm run dev
```
Open the Vite URL (e.g. http://localhost:5173 or 5174). The frontend talks to the backend via `VITE_API_URL` in dev. In production, it defaults to same-origin.
