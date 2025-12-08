# Home Credit PayFlow

B2B2C payroll platform with AI-powered migration and Employee Wage Access (EWA).

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- npm or yarn

### Installation

```bash
# Install all dependencies
npm install
npm run install:all
```

### Running the Application

```bash
# Start both backend and frontend
npm run dev
```

This will start:
- **Backend API** at `http://0.0.0.0:8000`
- **Frontend** at `http://localhost:3000`

### Demo

**Desktop (Employer):**
- Open `http://localhost:3000` in browser
- Navigate through tabs: Dashboard, Migration Studio, Employee Data, AI Insights, ADA Strategy

**Mobile (Employee):**
- Scan QR code from "Scan for Mobile" button, or
- Visit `http://<lan-ip>:3000` on your phone
- Access earnings and use EWA cashout flow

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS
- **Backend:** FastAPI, Python, Pandas
- **Mobile:** Progressive Web App (PWA)