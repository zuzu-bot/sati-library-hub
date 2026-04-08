# SATI Library Management System

A full-stack book management system with a modern React frontend, PHP backend, and PostgreSQL database.

## 🚀 Features
- **Modern UI**: Built with React, Tailwind CSS, and Lucide gold/glassmorphism theme.
- **Role-Based Authentication (RBAC)**: Supports `admin` and `student` roles.
- **Book Management**: Full CRUD for admins; descriptions and cover images supported.
- **AI Book Summaries**: Integrated with Google Gemini for instant 3-5 line summaries.
- **AI Engine Placeholder**: FastAPI structure in `/ai-engine` for modular AI development.
- **Environment Aware**: Fully configurable via `.env` files with SQLite fallback.

## 📁 Project Structure
- `/frontend`: React application (Vite + TypeScript + Tailwind)
- `/backend`: PHP REST APIs (JWT Auth)
- `/ai-engine`: FastAPI dummy placeholder
- `/database`: SQL schema and SQLite fallback

## ⚙️ Setup Instructions

### 1. Backend (PHP)
1. Navigate to the root directory.
2. Install dependencies in the `/backend` folder: `cd backend && composer install`.
3. Create a `.env` in the project root directory (copy from `.env.example`).
4. Add your `GEMINI_API_KEY` to the `.env` file for AI features.
5. Start the PHP server from the `/backend/api` directory:
   `php -S localhost:8000 -t backend/api`

### 2. Frontend (React)
1. Navigate to `/frontend`.
2. Install dependencies: `npm install`.
3. Create a `.env` in the `/frontend` directory with `VITE_API_BASE_URL=http://localhost:8000`.
4. Start the development server: `npm run dev`.

### 3. AI Engine (Optional)
1. Navigate to `/ai-engine`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run the engine: `python main.py`.

### 4. Database
- The system defaults to **Neon PostgreSQL** if the `pgsql` driver is available in PHP.
- Otherwise, it falls back to a local SQLite database for demonstration.
- Find the PostgreSQL schema in `database/schema.sql`.

## 🛠 Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide-react, Axios, React Router.
- **Backend**: PHP (Vanilla), Firebase/PHP-JWT, PHP-Dotenv.
- **Database**: PostgreSQL (Neon).
- **AI Engine**: FastAPI (Python).
