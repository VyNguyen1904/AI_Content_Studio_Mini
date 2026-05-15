# ✨ AI Content Studio Mini

A modern, lightweight Full-stack Web Application that leverages AI to help creators generate captions, rewrite content, and brainstorm new ideas instantly.

![Project Status](https://img.shields.io/badge/Status-Complete-green)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20FastAPI%20%7C%20OpenAI-blue)

## 🚀 Key Features

- **📸 AI Caption Generator**: Create engaging Instagram/TikTok captions with hashtags based on your topic and mood.
- **✍️ Content Rewriter**: Transform existing text into different styles (Formal, Gen Z style, Storytelling).
- **💡 Idea Generator**: Get instant content ideas including hooks and descriptions.
- **🌍 Multi-language Support**: Generate content in both **English** and **Vietnamese**.
- **🎨 Modern UI**: Clean, responsive, and user-friendly console-style dashboard.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), CSS3 (Modern Flexbox/Grid).
- **Backend**: Python, FastAPI.
- **AI Engine**: OpenAI API (Configured for GitHub Models / GPT-4o-mini).

## 📂 Project Structure

```text
AI_Content_Studio_Mini/
├── backend/            # FastAPI Server & AI Integration
│   ├── main.py
│   ├── .env            # Private API Keys (Excluded from Git)
│   └── requirements.txt
└── frontend/           # React Application
    ├── src/
    └── App.jsx
```

## ⚙️ Getting Started

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
```
Create a `.env` file in the `backend` folder and add your key:
```env
OPENAI_API_KEY=your_github_token_or_openai_key
```
Run the server:
```bash
python -m uvicorn main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📝 License
Distributed under the MIT License.

---
*Created with ❤️ for content creators and developer beginners.*
