# 🚀 SpaceOnClick Server

A scalable and modular **Node.js + Express backend** built to power SpaceOnClick — a platform for managing dynamic data with RESTful APIs and database integration.

---

## 📦 Tech Stack

- **Node.js** – JavaScript runtime environment  
- **Express.js** – Web application framework  
- **Mongoose** – MongoDB object modeling  
- **MongoDB** – NoSQL database  
- **dotenv** – Environment variable management  
- **Nodemon** – Development auto-restart tool  

---

## 📁 Folder Structure

```
spaceonclick-server/
├── app.js              # Main server entry point
├── config/             # Database and environment configuration
├── controllers/        # Route logic and business operations
├── models/             # Mongoose models (schemas)
├── routes/             # Express routes definitions
├── services/           # Helper and reusable logic (e.g., API services)
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devdixit-dev/spaceonclick-server.git
   cd spaceonclick-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

4. **Run the server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   node app.js
   ```

---

## 🧠 API Overview

Each module has a dedicated route and controller:
- `/api/users` → User authentication and management  
- `/api/spaces` → Space listings and details  
- `/api/bookings` → Booking and scheduling operations  

> 🧩 Use tools like **Postman** or **Insomnia** to test endpoints.

---

## 🧰 Scripts

| Command | Description |
|----------|--------------|
| `npm start` | Start server in production mode |
| `npm run dev` | Run with Nodemon for development |
| `npm test` | Run tests (if configured) |

---

## 🛠 Environment Variables

| Variable | Description |
|-----------|--------------|
| `PORT` | Server port |
| `MONGO_URI` | MongoDB connection string |
| `NODE_ENV` | Environment mode (`development`, `production`) |

---

## 📜 License

This project is licensed under the **MIT License**.

---

## ✨ Author

**Dev Dixit**  
💼 Backend Developer | Node.js | Express | MongoDB  
📧 devdixitsocial@gmail.com  
🌐 Github: devdixit-dev
