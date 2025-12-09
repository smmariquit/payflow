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


@app.get("/api/v1/employees")
async def get_employees(page: int = 1, per_page: int = 10) -> Dict[str, Any]:
    """
    Get paginated list of all employees with superhero alter ego names.
    
    Returns employee data for HR dashboard with pagination support.
    """
    # Superhero alter ego employees - 50 employees for realistic pagination
    all_employees = [
        {"employee_id": "HC-2024-001", "name": "Bruce Wayne", "department": "Executive", "earned_this_period": 45000, "available_ewa": 13500, "status": "active"},
        {"employee_id": "HC-2024-002", "name": "Clark Kent", "department": "Media Relations", "earned_this_period": 32000, "available_ewa": 9600, "status": "active"},
        {"employee_id": "HC-2024-003", "name": "Diana Prince", "department": "Legal", "earned_this_period": 38000, "available_ewa": 11400, "status": "active"},
        {"employee_id": "HC-2024-004", "name": "Peter Parker", "department": "Research", "earned_this_period": 28000, "available_ewa": 8400, "status": "active"},
        {"employee_id": "HC-2024-005", "name": "Tony Stark", "department": "Engineering", "earned_this_period": 52000, "available_ewa": 15600, "status": "active"},
        {"employee_id": "HC-2024-006", "name": "Natasha Romanoff", "department": "Security", "earned_this_period": 35000, "available_ewa": 10500, "status": "active"},
        {"employee_id": "HC-2024-007", "name": "Steve Rogers", "department": "Operations", "earned_this_period": 33000, "available_ewa": 9900, "status": "active"},
        {"employee_id": "HC-2024-008", "name": "Wanda Maximoff", "department": "HR", "earned_this_period": 29000, "available_ewa": 8700, "status": "active"},
        {"employee_id": "HC-2024-009", "name": "Stephen Strange", "department": "Consulting", "earned_this_period": 48000, "available_ewa": 14400, "status": "active"},
        {"employee_id": "HC-2024-010", "name": "Carol Danvers", "department": "Aviation", "earned_this_period": 42000, "available_ewa": 12600, "status": "active"},
        {"employee_id": "HC-2024-011", "name": "T'Challa", "department": "International Relations", "earned_this_period": 46000, "available_ewa": 13800, "status": "active"},
        {"employee_id": "HC-2024-012", "name": "Scott Lang", "department": "IT", "earned_this_period": 27000, "available_ewa": 8100, "status": "active"},
        {"employee_id": "HC-2024-013", "name": "Barry Allen", "department": "Logistics", "earned_this_period": 30000, "available_ewa": 9000, "status": "active"},
        {"employee_id": "HC-2024-014", "name": "Hal Jordan", "department": "Aerospace", "earned_this_period": 39000, "available_ewa": 11700, "status": "active"},
        {"employee_id": "HC-2024-015", "name": "Arthur Curry", "department": "Marine Operations", "earned_this_period": 34000, "available_ewa": 10200, "status": "active"},
        {"employee_id": "HC-2024-016", "name": "Oliver Queen", "department": "Finance", "earned_this_period": 44000, "available_ewa": 13200, "status": "active"},
        {"employee_id": "HC-2024-017", "name": "Selina Kyle", "department": "Asset Recovery", "earned_this_period": 31000, "available_ewa": 9300, "status": "active"},
        {"employee_id": "HC-2024-018", "name": "Matt Murdock", "department": "Legal", "earned_this_period": 37000, "available_ewa": 11100, "status": "active"},
        {"employee_id": "HC-2024-019", "name": "Jessica Jones", "department": "Investigations", "earned_this_period": 29000, "available_ewa": 8700, "status": "active"},
        {"employee_id": "HC-2024-020", "name": "Luke Cage", "department": "Security", "earned_this_period": 32000, "available_ewa": 9600, "status": "active"},
        {"employee_id": "HC-2024-021", "name": "Danny Rand", "department": "Finance", "earned_this_period": 41000, "available_ewa": 12300, "status": "active"},
        {"employee_id": "HC-2024-022", "name": "Wade Wilson", "department": "Marketing", "earned_this_period": 26000, "available_ewa": 7800, "status": "active"},
        {"employee_id": "HC-2024-023", "name": "Ororo Munroe", "department": "Environmental", "earned_this_period": 36000, "available_ewa": 10800, "status": "active"},
        {"employee_id": "HC-2024-024", "name": "Jean Grey", "department": "Research", "earned_this_period": 38000, "available_ewa": 11400, "status": "active"},
        {"employee_id": "HC-2024-025", "name": "Logan Howlett", "department": "Training", "earned_this_period": 33000, "available_ewa": 9900, "status": "active"},
        {"employee_id": "HC-2024-026", "name": "Raven Darkholme", "department": "Strategic Planning", "earned_this_period": 40000, "available_ewa": 12000, "status": "active"},
        {"employee_id": "HC-2024-027", "name": "Hank McCoy", "department": "Research", "earned_this_period": 43000, "available_ewa": 12900, "status": "active"},
        {"employee_id": "HC-2024-028", "name": "Kurt Wagner", "department": "Transportation", "earned_this_period": 28000, "available_ewa": 8400, "status": "active"},
        {"employee_id": "HC-2024-029", "name": "Kitty Pryde", "department": "IT", "earned_this_period": 30000, "available_ewa": 9000, "status": "active"},
        {"employee_id": "HC-2024-030", "name": "Bobby Drake", "department": "Facilities", "earned_this_period": 27000, "available_ewa": 8100, "status": "active"},
        {"employee_id": "HC-2024-031", "name": "Remy LeBeau", "department": "Sales", "earned_this_period": 35000, "available_ewa": 10500, "status": "active"},
        {"employee_id": "HC-2024-032", "name": "Anna Marie", "department": "Customer Service", "earned_this_period": 29000, "available_ewa": 8700, "status": "active"},
        {"employee_id": "HC-2024-033", "name": "Victor Stone", "department": "IT", "earned_this_period": 38000, "available_ewa": 11400, "status": "active"},
        {"employee_id": "HC-2024-034", "name": "Kara Zor-El", "department": "Media Relations", "earned_this_period": 31000, "available_ewa": 9300, "status": "active"},
        {"employee_id": "HC-2024-035", "name": "Barbara Gordon", "department": "IT Security", "earned_this_period": 39000, "available_ewa": 11700, "status": "active"},
        {"employee_id": "HC-2024-036", "name": "Dick Grayson", "department": "Operations", "earned_this_period": 34000, "available_ewa": 10200, "status": "active"},
        {"employee_id": "HC-2024-037", "name": "Jason Todd", "department": "Asset Recovery", "earned_this_period": 30000, "available_ewa": 9000, "status": "active"},
        {"employee_id": "HC-2024-038", "name": "Tim Drake", "department": "Analytics", "earned_this_period": 32000, "available_ewa": 9600, "status": "active"},
        {"employee_id": "HC-2024-039", "name": "Damian Wayne", "department": "Executive", "earned_this_period": 28000, "available_ewa": 8400, "status": "active"},
        {"employee_id": "HC-2024-040", "name": "Cassandra Cain", "department": "Training", "earned_this_period": 29000, "available_ewa": 8700, "status": "active"},
        {"employee_id": "HC-2024-041", "name": "Bucky Barnes", "department": "Security", "earned_this_period": 33000, "available_ewa": 9900, "status": "active"},
        {"employee_id": "HC-2024-042", "name": "Sam Wilson", "department": "Operations", "earned_this_period": 31000, "available_ewa": 9300, "status": "active"},
        {"employee_id": "HC-2024-043", "name": "Monica Rambeau", "department": "Energy Management", "earned_this_period": 37000, "available_ewa": 11100, "status": "active"},
        {"employee_id": "HC-2024-044", "name": "Kate Bishop", "department": "Marketing", "earned_this_period": 28000, "available_ewa": 8400, "status": "active"},
        {"employee_id": "HC-2024-045", "name": "Clint Barton", "department": "Security", "earned_this_period": 32000, "available_ewa": 9600, "status": "active"},
        {"employee_id": "HC-2024-046", "name": "Hope van Dyne", "department": "Engineering", "earned_this_period": 40000, "available_ewa": 12000, "status": "active"},
        {"employee_id": "HC-2024-047", "name": "Shuri", "department": "Research", "earned_this_period": 45000, "available_ewa": 13500, "status": "active"},
        {"employee_id": "HC-2024-048", "name": "Nakia", "department": "International Relations", "earned_this_period": 36000, "available_ewa": 10800, "status": "active"},
        {"employee_id": "HC-2024-049", "name": "Okoye", "department": "Security", "earned_this_period": 35000, "available_ewa": 10500, "status": "active"},
        {"employee_id": "HC-2024-050", "name": "M'Baku", "department": "Operations", "earned_this_period": 34000, "available_ewa": 10200, "status": "active"},
    ]
    
    # Calculate pagination
    total = len(all_employees)
    start = (page - 1) * per_page
    end = start + per_page
    
    # Get paginated slice
    employees = all_employees[start:end]
    
    return {
        "success": True,
        "employees": employees,
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": total,
            "total_pages": (total + per_page - 1) // per_page
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
