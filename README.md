# HubMall - Multi-Vendor Marketplace (Full-Stack)

A complete full-stack multi-vendor marketplace with a React (Vite + Tailwind CSS + Lucide Icons + Zustand) frontend and a Node.js (Express + Prisma ORM + PostgreSQL + JWT + RBAC) backend.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
Open terminal in the root directory and install dependencies for both frontend and backend:
```bash
# In HubMall root directory
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Backend Environment
1. In `backend/`, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Update `DATABASE_URL` with your PostgreSQL credentials (e.g., `postgresql://postgres:password@localhost:5432/hubmall_db?schema=public`).
3. Run the database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

### 3. Run the Application
Open two terminals:

- **Terminal 1 (Backend - Port 5000):**
  ```bash
  cd backend
  npm run dev
  ```

- **Terminal 2 (Frontend - Port 5173):**
  ```bash
  cd frontend
  npm run dev
  ```

Visit `http://localhost:5173` in your browser!

---

## 📦 Features Included
- **Authentication:** Registration and Login with JWT saved to secure `httpOnly` cookies and local state.
- **Role-Based Access:** Buyer, Seller, and Admin access levels.
- **Product Catalog & Filters:** Search by title, category filtering, and price bounds.
- **Shopping Cart:** Persistent Zustand client cart with instant quantity updates and price totals.
- **Seller Dashboard:** Seller stats overview and product management interfaces.
