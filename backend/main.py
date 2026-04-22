this is intentionally broken

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq
import os

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Allow React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Define what the input must look like
class LogInput(BaseModel):
    log: str

# Health check route
@app.get("/")
def read_root():
    return {"message": "LLM DevOps Assistant is running"}

# Main route — analyzes the log
@app.post("/analyze")
def analyze_log(input: LogInput):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a DevOps assistant. Analyze build logs and return:\n"
                    "1) Root cause in 1 line\n"
                    "2) Fix suggestion in 2-3 lines"
                )
            },
            {
                "role": "user",
                "content": f"Analyze this build log:\n{input.log}"
            }
        ]
    )
    return {"analysis": response.choices[0].message.content}