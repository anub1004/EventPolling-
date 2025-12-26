# 🚀 Full Stack Event Polling Application (MERN)

  - **Live Frontend:** 🔗 [https://eventman-alpha.vercel.app/](https://eventman-alpha.vercel.app/)
  - **Live Backend API:** 🔗 [https://eventpollapi.onrender.com](https://eventpollapi.onrender.com)
 - **MongoDB Atlas:** ☁️ Cloud-hosted database (details below)

---

## 📌 Overview

This is a **full-stack Event Polling & Management application** built using the **MERN stack (MongoDB, Express, React, Node.js)**. The platform allows users to authenticate, create and manage events, vote or participate in polls, and securely interact with the system using JWT-based authentication.

The project is structured as **two independent applications**:

* **Frontend** – React + Vite
* **Backend** – Node.js + Express + MongoDB

Both are deployed independently and communicate via REST APIs.

---

## 🧱 Tech Stack

### Frontend

* ⚛️ React (Vite)
* 🧭 React Router DOM
* 🎨 Tailwind CSS / shadcn-ui
* 🔐 JWT-based authentication
* 🌐 Axios for API calls

### Backend

* 🟢 Node.js
* 🚂 Express.js
* 🍃 MongoDB + Mongoose
* 🔐 JSON Web Tokens (JWT)
* 🔑 bcrypt for password hashing
* 🌍 CORS enabled

### Database

* ☁️ MongoDB Atlas (Cloud)

---

# 🌐 LIVE LINKS (IMPORTANT)

| Service          | URL                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| Frontend         | [https://eventman-alpha.vercel.app/](https://eventman-alpha.vercel.app/)                     |
| Backend API      | [https://eventpollapi.onrender.com](https://eventpollapi.onrender.com)                       |
| API Health Check | [https://eventpollapi.onrender.com/api/health](https://eventpollapi.onrender.com/api/health) |



# 📁 Project Structure

```
root/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🖥️ FRONTEND – Detailed Documentation

## 🔹 Features

* User Authentication (Login / Signup)
* Protected Routes
* Event creation and management
* Poll participation
* API-based data fetching
* Responsive UI

---

## 🔧 Frontend Installation (Local)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔐 Frontend Environment Variables

Create a `.env` file in `frontend/`:

```
VITE_API_BASE_URL=https://eventpollapi.onrender.com/api
```


---

## 🔁 Frontend API Flow

* User logs in → JWT received
* JWT stored securely (context / localStorage)
* JWT attached to every protected API request

Example API service:

```js
axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
})
```

---

# 🧠 BACKEND – Detailed Documentation

## 🔹 Features

* Secure authentication with JWT
* Role-based access (if enabled)
* RESTful APIs
* MongoDB integration
* Error handling middleware

---

## 🔧 Backend Installation (Local)

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 🔐 Backend Environment Variables

Create a `.env` file in `backend/`:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/eventpoll
JWT_SECRET=your_super_secret_key
NODE_ENV=production
```

---

## 🗄️ MongoDB Atlas – Complete Details

### 🔹 What is MongoDB Atlas?

MongoDB Atlas is a **fully managed cloud NoSQL database** service.

### 🔹 How this project uses Atlas

* Stores user data
* Stores event data
* Stores poll & voting data
* Highly scalable & secure

---

### 🔹 Creating MongoDB Atlas Database

1. Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free cluster (M0)
3. Create database user
4. Whitelist IP (`0.0.0.0/0` for deployment)
5. Copy connection string

Example:

```
mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/eventpoll
```

---

### 🔹 Mongoose Connection Example

```js
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));
```

---

# 🔐 Authentication Flow

1. User registers
2. Password hashed with bcrypt
3. JWT generated on login
4. JWT validated via middleware
5. Protected routes accessible only with valid token

---

# 🛡️ Security Best Practices Used

* Password hashing (bcrypt)
* JWT authentication
* Environment variables for secrets
* CORS configuration
* No secrets pushed to GitHub

---

# 🚀 Deployment Guide (Summary)

### Frontend

* Deploy on **Vercel / Netlify**
* Add `VITE_API_BASE_URL` in environment settings

### Backend

* Deploy on **Railway / Render**
* Add `.env` variables in dashboard
* Ensure MongoDB Atlas allows deployment IP

---

# 🧪 Testing

* API tested using Postman
* Frontend tested in browser
* Auth & protected routes verified

---

# 🧹 Common Issues & Fixes

### ❌ CORS Error

✔ Ensure backend allows frontend domain

### ❌ 401 Unauthorized

✔ Check JWT & headers

### ❌ MongoDB connection failed

✔ Check IP whitelist & URI

---

# 📌 Future Enhancements

* Admin dashboard
* Analytics
* Email notifications
* OAuth login

---

# 👨‍💻 Author

**Anubhav Singh**
GitHub: [https://github.com/anub1004](https://github.com/anub1004)

---

# ⭐ Support

If you find this project useful, give it a ⭐ on GitHub!

---

> 📌 This README is production-ready and suitable for recruiters, clients, and deployment documentation.




