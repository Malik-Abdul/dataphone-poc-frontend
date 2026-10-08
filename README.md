# DataPhone POC — Frontend

Next.js frontend for the DataPhone POC. The application provides DataPhone staff with a unified interface for managing customers and phone numbers across multiple telecom carriers.

The frontend communicates with the DataPhone NestJS backend through REST APIs.

---

## Tech Stack

- Next.js
- React
- TypeScript
- Axios
- React Query
- CSS / UI components

---

# Prerequisites

Make sure the following are installed:

- Node.js
- npm
- DataPhone POC backend

The backend must be running before using the frontend.

---

# Getting Started

## 1. Clone the Repository

If the frontend is part of the main repository:

```bash
git clone <repository-url>

cd dataphone-poc
```

Navigate to the frontend directory if applicable:

```bash
cd frontend
```

---

## 2. Install Dependencies

Install the frontend dependencies:

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env.local` file in the frontend root.

You can use the provided example file:

```bash
cp .env.example .env.local
```

Update the backend API URL according to your local environment.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

> **Note:** The exact environment variable names should match the variables provided in `.env.example`.

Do not commit `.env.local` or any environment file containing private credentials.

---

# 4. Start the Development Server

Run:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:3000
```

If the Next.js application is configured to use another port, use the configured port instead.

---

# Application Overview

The frontend provides a centralized interface for DataPhone staff to manage phone numbers and customers.

```text
                    DataPhone Frontend
                           │
                           ▼
                    Next.js Application
                           │
                           ▼
                    REST API / Axios
                           │
                           ▼
                  NestJS Backend API
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
        PostgreSQL                    Carriers
                                      │
                           ┌──────────┼──────────┐
                           ▼          ▼          ▼
                       Peerless     BulkVS    Bandwidth
```

---

# Main Features

## Authentication

The frontend provides:

- Login
- Protected routes
- Authentication state handling
- Logout
- Authenticated API requests
- Access to protected application pages based on authentication/authorization

Users must authenticate before accessing the main application.

---

# Dashboard

The dashboard provides an overview of the DataPhone system and gives staff quick access to the main management areas.

---

# Customer Management

The customer section allows DataPhone staff to:

- View customers
- Search customers
- Add customers
- View customer details
- View phone numbers associated with a customer

Customer data is retrieved from the backend API.

---

# Phone Number Management

The phone-number management interface provides a centralized view of numbers from the supported carriers.

Staff can:

- View phone numbers
- Search phone numbers
- Filter by carrier
- Filter by status
- Filter customer assignments
- Assign a phone number to a customer
- Move a phone number from one customer to another
- Release/disconnect a phone number
- View phone-number history

The frontend uses the backend as the source of truth for phone-number state.

---

# Phone Number Lifecycle

The POC supports the following basic phone-number lifecycle:

```text
                  Carrier
                     │
                     ▼
                 Available
                     │
                     ▼
                UNASSIGNED
                     │
                     ▼
                 ASSIGNED
                     │
             ┌───────┴───────┐
             ▼               ▼
          MOVED           RELEASED
             │               │
             ▼               ▼
        New Customer      DISCONNECTED
```

The exact status transitions are handled by the backend API.

---

# Carrier Synchronization

The backend supports synchronization with:

- Peerless Network
- BulkVS
- Bandwidth

The frontend can display the synchronized phone-number data provided by the backend.

The architecture separates carrier-specific integrations from the frontend, allowing additional carriers to be integrated later without changing the core UI workflow.

---

# API Integration

The frontend communicates with the NestJS backend using Axios.

The API base URL is configured through an environment variable.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Typical API areas include:

```text
/auth
/users
/customers
/phone-numbers
/carrier
```

The frontend does not directly communicate with carrier APIs. Carrier communication is handled by the backend.

---

# Frontend Structure

The project follows a feature/component-based structure.

Example:

```text
src/
├── app/
│   ├── (protected)/
│   │   ├── dashboard/
│   │   ├── customers/
│   │   └── phone-numbers/
│   └── login/
│
├── components/
│   ├── customers/
│   ├── phone-numbers/
│   │   ├── AssignPhoneNumberModal.tsx
│   │   ├── MovePhoneNumberModal.tsx
│   │   └── ReleasePhoneNumberModal.tsx
│   └── ui/
│
├── services/
│   ├── auth.service.ts
│   ├── customer.service.ts
│   └── phone-number.service.ts
│
└── ...
```

The exact structure may evolve as additional features are added.

---

# Important Frontend Components

### Customer Management

Provides the customer list, search, creation, and customer-related phone-number views.

### Phone Number Management

Provides:

- Phone-number listing
- Search
- Filters
- Assignment
- Moving numbers
- Releasing/disconnecting numbers
- Number history

### Assign Phone Number Modal

Used to assign an unassigned phone number to a customer.

### Move Phone Number Modal

Used to move an assigned phone number from one customer to another.

### Release Phone Number Modal

Used to release/disconnect a phone number after confirmation.

---

# Development Commands

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

## Build production application

```bash
npm run build
```

## Start production application

```bash
npm run start
```

## Run linting

```bash
npm run lint
```

---

# Running Frontend + Backend

The frontend requires the DataPhone backend to be running.

### Terminal 1 — Backend

From the backend directory:

```bash
npm install

docker compose up -d

npm run seed

npm run start:dev
```

### Terminal 2 — Frontend

From the frontend directory:

```bash
npm install

npm run dev
```

Then open the frontend application in the browser.

---

# POC Workflow

The primary demonstration flow is:

```text
Login
  │
  ▼
Dashboard
  │
  ├──────────────► Customers
  │                    │
  │                    ├── Search
  │                    ├── Add Customer
  │                    └── View Customer Numbers
  │
  └──────────────► Phone Numbers
                       │
                       ├── Search
                       ├── Filter
                       ├── Assign
                       ├── Move
                       ├── Release / Disconnect
                       └── View History
```

---

# Backend Dependency

The frontend is dependent on the DataPhone NestJS backend.

Make sure the backend is running and accessible at the URL configured in:

```text
.env.local
```

For local development, this will typically be:

```text
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

# Notes

This frontend is part of the DataPhone proof of concept and is intended to demonstrate the core internal workflow for managing customer phone numbers.

The application is designed around a centralized DataPhone view so staff do not need to manually manage phone-number ownership across separate carrier portals.

Carrier-specific API communication is intentionally kept inside the backend.

The current POC uses mocked carrier responses where live carrier credentials/API access are not available.
