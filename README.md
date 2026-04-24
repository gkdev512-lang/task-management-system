# 🚀 TaskFlow – Task Management System

A full-stack Task Management System built using **React.js**, **.NET Core Web API**, and **SQL Server**.  
This application allows users to manage daily tasks efficiently with authentication, filtering, and a clean dashboard UI.

---

## 🔥 Features

- 🔐 User Authentication using JWT
- 📝 Create, Update, Delete Tasks
- ✅ Mark Tasks as Complete
- 🔍 Filter Tasks (All / Completed / Pending)
- 📊 Dashboard Overview (Task Stats)
- 👤 User-specific task management

---

## 🛠 Tech Stack

- **Frontend:** React.js  
- **Backend:** .NET Core Web API  
- **Database:** SQL Server  

---

## 📸 Screenshots

### 🔐 Login
![Login](./screenshots/login.png)

### 📊 Dashboard
![Dashboard](./screenshots/dashboard.png)

### ✅ Tasks
![Tasks](./screenshots/tasks.png)

---

## 🛠 Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/gkdev512-lang/task-management-system.git
cd task-management-system
2️⃣ Setup Database
Open SQL Server
Run script:
/database/db_script.sql
3️⃣ Run Backend
cd backend
dotnet run
4️⃣ Run Frontend
cd frontend
npm install
npm start
5️⃣ Access Application
http://localhost:3000

👉 Register a new user and login

📂 Project Structure
task-management-system/
│
├── frontend/        # React UI
├── backend/         # .NET Core API
├── database/        # SQL Scripts
├── screenshots/     # Project Images
└── README.md
💡 Future Improvements
Add task priority (High / Medium / Low)
Add due dates for tasks
Add notifications / alerts
Improve UI with advanced components
👨‍💻 Author

Gaurav
