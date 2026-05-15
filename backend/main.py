from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

# Khởi tạo OpenAI Client trỏ sang GitHub Models
client = OpenAI(
    base_url="https://models.inference.ai.azure.com",
    api_key=os.getenv("OPENAI_API_KEY")
)

app = FastAPI(title="AI Content Studio Mini API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models cập nhật thêm trường language
class CaptionRequest(BaseModel):
    topic: str
    mood: str
    language: str = "Tiếng Việt"

class RewriteRequest(BaseModel):
    text: str
    style: str
    language: str = "Tiếng Việt"

class IdeaRequest(BaseModel):
    topic: str
    language: str = "Tiếng Việt"

@app.get("/")
def home():
    return {"message": "AI Content Studio Mini API is running!"}

@app.post("/generate-caption")
def generate_caption(request: CaptionRequest):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": f"You are a creative content creator. Please answer in {request.language}. Return a JSON object with 'caption' and 'hashtags' fields."},
                {"role": "user", "content": f"Write an Instagram caption about {request.topic}. Style: {request.mood}. Language: {request.language}. Add emojis and hashtags."}
            ],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        return {"caption": f"Lỗi gọi AI: {str(e)}", "hashtags": "#error"}

@app.post("/rewrite")
def rewrite_content(request: RewriteRequest):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": f"You are a professional editor. Please answer in {request.language}. Return a JSON object with 'rewritten_text' field."},
                {"role": "user", "content": f"Rewrite this text in {request.style} style: {request.text}. Support language: {request.language}"}
            ],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        return {"rewritten_text": f"Lỗi gọi AI: {str(e)}"}

@app.post("/generate-idea")
def generate_idea(request: IdeaRequest):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": f"You are a content strategist. Please answer in {request.language}. Return a JSON object with an 'ideas' array. Each item has 'hook', 'title', and 'description'."},
                {"role": "user", "content": f"Generate 5 content ideas about {request.topic} in {request.language}. Include hook, title, and description."}
            ],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        return {"ideas": [{"title": "Lỗi API", "hook": "Xảy ra lỗi", "description": str(e)}]}
