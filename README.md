# Salvage Boats Auction (SBA Project)
A full-stack project with:
- **Frontend**: React + TypeScript + Vite
- **Backend**: FastAPI + SQLAlchemy + SQLite
The backend auto-creates and seeds sample auction/listing data on startup.
## Project Structure
- `frontend/` — React UI
- `backend/` — FastAPI API
- `data/` — local SQLite DB (generated at runtime, ignored in git)
## Prerequisites
- Node.js (v18+ recommended)
- npm
- Python 3.9+ (3.10+ recommended)
- pip
## Run Locally
### 1) Start Backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
Backend runs at: http://localhost:8000
Health endpoint: http://localhost:8000/api/health

2) Start Frontend (new terminal)
cd frontend
npm install
npm run dev
Frontend runs at: http://localhost:5173

Environment (Frontend)
If needed, set API URL in frontend/.env:

VITE_API_URL=http://localhost:8000

