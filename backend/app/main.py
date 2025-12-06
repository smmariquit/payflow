"""PayFlow FastAPI Backend - Main Application."""
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from io import StringIO
from typing import Dict, Any, List
from app.utils import get_lan_ip
from app.services.ai import get_ai_service

app = FastAPI(
    title="PayFlow API",
    description="Home Credit PayFlow - B2B2C Payroll Platform API",
    version="1.0.0"
)

# CORS Configuration - Allow frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint - API health check."""
    return {
        "service": "PayFlow API",
        "status": "operational",
        "version": "1.0.0"
    }


@app.post("/api/v1/upload")
async def upload_csv(file: UploadFile = File(...)) -> Dict[str, Any]:
    """
    Upload and parse payroll CSV.
    
    Returns the first 5 rows as JSON for preview.
    """
    # Validate file type
    if not file.filename.endswith('.csv'):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Please upload a CSV file."
        )
    
    try:
        # Read file contents
        contents = await file.read()
        csv_data = contents.decode('utf-8')
        
        # Parse with Pandas
        df = pd.read_csv(StringIO(csv_data))
        
        # Get metadata
        total_rows = len(df)
        columns = df.columns.tolist()
        
        # Convert first 5 rows to JSON
        preview_data = df.head(5).to_dict(orient='records')
        
        return {
            "success": True,
            "filename": file.filename,
            "total_rows": total_rows,
            "columns": columns,
            "preview": preview_data
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing CSV: {str(e)}"
        )


@app.get("/api/v1/employee/me")
async def get_employee_data() -> Dict[str, Any]:
    """
    Get current employee's payroll data.
    
    Returns mock data for demo purposes.
    """
    return {
        "success": True,
        "employee": {
            "name": "Juan Dela Cruz",
            "employee_id": "HC-2024-001",
            "earned_this_period": 8450.00,
            "available_for_withdrawal": 2500.00,
            "currency": "PHP",
            "pay_period": "Dec 1 - Dec 15, 2024",
            "next_payday": "Dec 16, 2024"
        }
    }


@app.get("/api/v1/system/ip")
async def get_system_ip() -> Dict[str, str]:
    """
    Get the server's LAN IP address.
    
    Used by frontend to generate QR codes for mobile demo handoff.
    """
    lan_ip = get_lan_ip()
    return {
        "ip": lan_ip,
        "frontend_url": f"http://{lan_ip}:3000"
    }


# Additional endpoint for employee transaction history
@app.get("/api/v1/employee/transactions")
async def get_transactions() -> Dict[str, Any]:
    """Get employee transaction history (mock data)."""
    return {
        "success": True,
        "transactions": [
            {
                "id": "TXN-001",
                "type": "withdrawal",
                "amount": 1000.00,
                "date": "2024-12-05",
                "status": "completed"
            },
            {
                "id": "TXN-002",
                "type": "withdrawal",
                "amount": 500.00,
                "date": "2024-12-03",
                "status": "completed"
            }
        ]
    }


# AI Agent Endpoints (Placeholders)
@app.post("/api/v1/ai/chat")
async def ai_chat(message: Dict[str, str]) -> Dict[str, Any]:
    """
    AI chat assistant for payroll questions.
    
    Uses AI service for intelligent responses.
    """
    user_message = message.get("message", "")
    
    # Get AI service instance
    ai_service = get_ai_service()
    
    # Context for AI (would come from actual user data)
    context = {
        "available": 2500.00,
        "earned": 8450.00,
        "next_payday": "2024-12-16"
    }
    
    # Call AI service for response
    response = await ai_service.chat_completion(user_message, context)
    
    return {
        "success": True,
        "response": response,
        "context": context
    }


@app.post("/api/v1/ai/analyze")
async def ai_analyze_spending() -> Dict[str, Any]:
    """
    AI spending pattern analysis.
    
    Uses AI service for predictive analytics.
    """
    ai_service = get_ai_service()
    
    # Mock transaction data (would come from database)
    transactions = [
        {"amount": 1000, "date": "2024-12-05", "type": "withdrawal"},
        {"amount": 500, "date": "2024-12-03", "type": "withdrawal"}
    ]
    
    employee_data = {
        "earned": 8450.00,
        "available": 2500.00
    }
    
    result = await ai_service.analyze_spending(transactions, employee_data)
    return result


@app.post("/api/v1/ai/recommend")
async def ai_recommend() -> Dict[str, Any]:
    """
    AI financial recommendations.
    
    Uses AI service for personalized advice.
    """
    ai_service = get_ai_service()
    
    employee_data = {"earned": 8450.00, "available": 2500.00}
    spending_patterns = {"withdrawal_frequency": "weekly"}
    
    recommendations = await ai_service.generate_recommendations(
        employee_data, 
        spending_patterns
    )
    
    return {
        "success": True,
        "recommendations": recommendations,
        "total_potential_savings": sum(r.get("potential_savings", 0) for r in recommendations)
    }


# Employer AI Endpoints
@app.post("/api/v1/ai/payroll-insights")
async def ai_payroll_insights() -> Dict[str, Any]:
    """
    AI insights for employer payroll data.
    
    Uses AI service for payroll analytics.
    """
    ai_service = get_ai_service()
    
    # Mock payroll data (would come from database)
    payroll_data = [
        {"employee_id": "001", "earned": 8450, "withdrawn": 2000},
        {"employee_id": "002", "earned": 9200, "withdrawn": 2500}
    ]
    
    insights = await ai_service.payroll_insights(payroll_data)
    return insights


@app.post("/api/v1/ai/csv-validate")
async def ai_csv_validate(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    AI-powered CSV validation and error detection.
    
    Uses AI service for intelligent data validation.
    """
    ai_service = get_ai_service()
    
    csv_data = data.get("csv_data", [])
    validation_result = await ai_service.validate_csv(csv_data)
    
    return validation_result
