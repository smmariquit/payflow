# AI Integration Guide for PayFlow

## Overview
This guide shows how to integrate real AI providers into PayFlow's backend.

## Project Structure
```
backend/
├── app/
│   ├── services/
│   │   ├── __init__.py
│   │   └── ai.py              # AI service implementation
│   └── main.py                 # API endpoints use ai.py
├── .env.example                # Environment variables template
├── requirements.txt            # Base requirements
└── requirements-ai.txt         # AI provider requirements
```

## Quick Start

### 1. Choose Your AI Provider

**OpenAI (Recommended)**
```bash
pip install openai>=1.0.0
```

**Anthropic Claude**
```bash
pip install anthropic>=0.7.0
```

**Google Gemini**
```bash
pip install google-generativeai>=0.3.0
```

### 2. Set Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Add your API key:
```
OPENAI_API_KEY=sk-your-key-here
AI_ENABLED=true
AI_PROVIDER=openai
```

### 3. Update `app/services/ai.py`

Replace the `__init__` method in `AIService` class:

**For OpenAI:**
```python
def __init__(self):
    import openai
    self.client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    self.model = os.getenv("OPENAI_MODEL", "gpt-4")
```

**For Anthropic:**
```python
def __init__(self):
    import anthropic
    self.client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    self.model = os.getenv("ANTHROPIC_MODEL", "claude-3-5-sonnet-20241022")
```

### 4. Implement Chat Completion

Replace `chat_completion` method:

**OpenAI:**
```python
async def chat_completion(self, message: str, context: Optional[Dict] = None) -> str:
    system_prompt = f"""You are PayFlow AI, an assistant for a payroll platform.
    
Employee context:
- Available for withdrawal: ₱{context.get('available', 0):,.2f}
- Total earned: ₱{context.get('earned', 0):,.2f}
- Next payday: {context.get('next_payday', 'Unknown')}

Be helpful, concise, and use Philippine Peso (₱) formatting."""

    response = await self.client.chat.completions.create(
        model=self.model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message}
        ]
    )
    
    return response.choices[0].message.content
```

**Anthropic:**
```python
async def chat_completion(self, message: str, context: Optional[Dict] = None) -> str:
    system_prompt = f"""You are PayFlow AI assistant...
    (same as above)"""
    
    response = await self.client.messages.create(
        model=self.model,
        max_tokens=1024,
        system=system_prompt,
        messages=[{"role": "user", "content": message}]
    )
    
    return response.content[0].text
```

## API Endpoints Already Integrated

All endpoints in `main.py` now call the AI service:

- `POST /api/v1/ai/chat` → `AIService.chat_completion()`
- `POST /api/v1/ai/analyze` → `AIService.analyze_spending()`
- `POST /api/v1/ai/recommend` → `AIService.generate_recommendations()`
- `POST /api/v1/ai/payroll-insights` → `AIService.payroll_insights()`
- `POST /api/v1/ai/csv-validate` → `AIService.validate_csv()`

## Example: Full OpenAI Integration

**1. Install:**
```bash
pip install openai>=1.0.0
```

**2. Set `.env`:**
```
OPENAI_API_KEY=sk-proj-...
AI_ENABLED=true
AI_PROVIDER=openai
OPENAI_MODEL=gpt-4
```

**3. Update `app/services/ai.py`:**

```python
import os
from typing import Dict, List, Any, Optional
from openai import AsyncOpenAI

class AIService:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = os.getenv("OPENAI_MODEL", "gpt-4")
    
    async def chat_completion(self, message: str, context: Optional[Dict] = None) -> str:
        system_prompt = f"""You are PayFlow AI, a helpful assistant for employees.
        
Context:
- Available: ₱{context.get('available', 0):,.2f}
- Earned: ₱{context.get('earned', 0):,.2f}
- Next payday: {context.get('next_payday')}

Answer questions about payroll, earnings, and withdrawals."""

        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ]
        )
        
        return response.choices[0].message.content
    
    async def analyze_spending(self, transactions: List[Dict], employee_data: Dict) -> Dict:
        prompt = f"""Analyze this employee's spending pattern:
        
Transactions: {transactions}
Employee data: {employee_data}

Return JSON with:
- insights: array of {{"type", "title", "description", "severity"}}
- score: 0-100
- savings_potential: number

Be specific and actionable."""

        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        
        import json
        return json.loads(response.choices[0].message.content)
```

**4. Restart server:**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Testing

Test chat endpoint:
```bash
curl -X POST http://localhost:8000/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "How much can I withdraw?"}'
```

## Advanced: Streaming Responses

For real-time chat:

```python
from fastapi.responses import StreamingResponse

async def chat_completion_stream(self, message: str, context: Dict):
    response = await self.client.chat.completions.create(
        model=self.model,
        messages=[{"role": "user", "content": message}],
        stream=True
    )
    
    async for chunk in response:
        if chunk.choices[0].delta.content:
            yield chunk.choices[0].delta.content
```

Update endpoint:
```python
@app.post("/api/v1/ai/chat-stream")
async def ai_chat_stream(message: Dict[str, str]):
    ai_service = get_ai_service()
    return StreamingResponse(
        ai_service.chat_completion_stream(message.get("message"), {}),
        media_type="text/event-stream"
    )
```

## Production Considerations

1. **Rate Limiting**: Implement per-user rate limits
2. **Caching**: Cache similar queries
3. **Error Handling**: Graceful fallback to mock responses
4. **Monitoring**: Track API costs and usage
5. **Security**: Never expose API keys, use environment variables

## Cost Optimization

- Use GPT-3.5-turbo for simple queries
- Cache frequently asked questions
- Implement semantic search before calling AI
- Set max_tokens limits
- Use function calling for structured data

## Next Steps

1. Replace all mock methods in `ai.py` with real AI calls
2. Add prompt engineering for better responses
3. Implement RAG (Retrieval Augmented Generation) for policy docs
4. Add user feedback loop for improving responses
5. Create admin dashboard for monitoring AI usage
