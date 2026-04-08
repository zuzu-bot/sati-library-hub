# SATI Library Management System

A full-stack book management system with a modern React frontend, PHP backend, and PostgreSQL database.

## 🚀 Features
- **Modern UI**: Built with React, Tailwind CSS, and Lucide icons.
- **Authentication**: JWT-based login and registration.
- **Book CRUD**: Full management of your personal book collection.
- **AI-Powered**: Ready for AI integration with a FastAPI placeholder.
- **Environment Aware**: Configurable via `.env` files.

## 📁 Project Structure
- `/frontend`: React application (Vite + TypeScript + Tailwind)
- `/backend`: PHP REST APIs (JWT Auth)
- `/ai-engine`: FastAPI dummy placeholder
- `/database`: SQL schema and SQLite fallback

## ⚙️ Setup Instructions

### 1. Backend (PHP)
1. Navigate to `/backend`.
2. Install dependencies: `composer install`.
3. Create a `.env` in the root directory (see `.env.example`).
4. Start the PHP server: `php -S localhost:8000 -t api`.

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
