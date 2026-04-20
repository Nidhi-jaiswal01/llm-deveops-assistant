# LLM DevOps Assistant

Paste a CI/CD build log → get an AI-generated root cause and fix suggestion.

## Tech Stack
- Backend: Python + FastAPI
- AI: Claude API (Anthropic)
- Frontend: React.js + Tailwind (coming soon)

## How to Run

### Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

## Environment Variables
Create a `.env` file in `/backend` with:
ANTHROPIC_API_KEY=your_key_here