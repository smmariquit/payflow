# PayFlow - Home Credit Payroll Platform

A B2B2C payroll platform prototype with CSV migration studio for employers and PWA for employees.

## Quick Start

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.10+ (for backend)
- npm or yarn

### Installation

```bash
# Install root dependencies
npm install

# Install all dependencies (frontend + backend)
npm run install:all
```

### Running the Application

```bash
# Start both backend and frontend
npm run dev
```

This will start:
- **Backend API** at `http://0.0.0.0:8000` (accessible on LAN)
- **Frontend** at `http://localhost:3000`

### Demo Handoff Flow

1. Open `http://localhost:3000` on your desktop
2. Navigate to "Connect Mobile" in the sidebar
3. Scan the QR code with your phone (ensure phone is on same Wi-Fi)
4. Mobile view will automatically load on your phone

## Architecture

- **Backend:** FastAPI + Python (CSV processing, employee data API)
- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS + Shadcn/UI
- **PWA:** Installable mobile app experience
- **Responsive:** Desktop = Employer Dashboard, Mobile = Employee App

## Features

- CSV payroll data upload and preview
- Employee earned wage viewing
- Progressive Web App (PWA) for mobile
- QR code handoff for instant mobile demo
- Home Credit branded UI (#B82329)
