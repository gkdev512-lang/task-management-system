# 🗂️ Task Management System

A full-stack Task Management System built using **React.js**, **.NET Core Web API**, and **SQL Server** with secure **JWT Authentication**.

---

## 🚀 Features

* 🔐 User Authentication (Register / Login / Change Password)
* ✅ Create, Update, Delete Tasks
* 📌 Mark Tasks as Complete
* 📊 Dashboard with Task Statistics
* 🔒 Protected APIs using JWT
* 🧱 Clean Architecture (Repository Pattern)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* React Router

### Backend

* .NET Core Web API
* Entity Framework Core
* Repository Pattern

### Database

* SQL Server

### Authentication

* JWT (JSON Web Token)

---

## 📁 Project Structure

```
task-management-system/
│
├── frontend/     # React Application
├── backend/      # .NET Core Web API
```

---

## ⚙️ Getting Started

### 🔹 Backend Setup

```
cd backend
dotnet restore
dotnet run
```

---

### 🔹 Frontend Setup

```
cd frontend
npm install
npm start
```

---

## 🔐 API Overview

* `POST /api/Users/register` → Register new user
* `POST /api/Users/login` → Login & get JWT token
* `GET /api/Tasks/my-tasks` → Get user tasks
* `POST /api/Tasks` → Create task
* `PUT /api/Tasks/{id}` → Update task
* `DELETE /api/Tasks/{id}` → Delete task

---

## 📸 Screenshots



## 💡 Highlights

* Secure user-based task access using JWT
* Clean separation of concerns (Controller → Service → Repository)
* Scalable and maintainable backend architecture
* Responsive and user-friendly UI

---

## 📌 Future Improvements

* Task filtering & search
* Due dates & priority
* Notifications / reminders
* Pagination

---

## 👨‍💻 Author

GitHub: https://github.com/gkdev512-lang

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
