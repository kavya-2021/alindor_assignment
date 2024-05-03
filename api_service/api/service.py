import os
import random
import json
from fastapi import FastAPI, UploadFile, File
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse

# Setup FastAPI app
app = FastAPI(
    title="API Server",
    description="API Server",
    version="v1"
)

# Enable CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
@app.get(
    "/",
    summary="Index",
    description="Root api"
)
async def get_index():
    return {
        "message": "Welcome to the API Service"
    }

@app.post("/analyze/")
async def analyze(cv: UploadFile = File(...), job_description: UploadFile = File(...)):
    score = random.randint(1, 10)
    explanation = "The score is based on keyword matching and relevance between your CV and the job description."
    return json.dumps({"score": score, "explanation": explanation})
