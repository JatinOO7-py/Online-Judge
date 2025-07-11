# **My Online Judge**



An Online Judge platform where users can submit code in multiple languages (C++, Java, Python), get it compiled and evaluated, and view results — just like LeetCode, HackerRank, or Codeforces.

This project features:

\- 👨‍💻 Code editor with syntax highlighting for multiple languages

\- 📤 Code submission and execution engine

\- 📊 Evaluation based on predefined test cases

\- 🔐 User roles (admin, user) and secure login/signup

\- 🌐 Full-stack architecture (MongoDB + Node.js + React + Docker)



## **📽️ Demo**

👉 [Watch Demo Video](#)  



## **🧱 Project Structure**

```
project-root/
│
├── BackEnd/                   # Node.js backend with code execution logic
│   ├── index.js
│   ├── Dockerfile
│   └── .env                   # For MongoDB URI, ports, etc.
│
├── FrontEnd/
│   └── onlinejudge/           # Vite + React frontend
│       ├── Dockerfile
│       ├── vite.config.js
│       └── src/
│
├── docker-compose.yml         # Spin up MongoDB, backend, and frontend
└── README.md
```


## **🚀 Features**

| Feature            | Description                                                       |
|--------------------|-------------------------------------------------------------------|
| ✍️ Code Editor     | Built with `@uiw/react-codemirror` and CodeMirror syntax support |
| ⚙️ Language Support| C++, Java, Python (compiled and executed in backend container)   |
| 📡 API Backend     | Express-based backend connected to MongoDB                        |
| 📚 User Management | Signup/Login with roles and secure password hashing              |
| 🐳 Dockerized      | Fully containerized using Docker Compose                         |
| 💾 Persistent DB   | Data stored in Docker volumes and preserved across restarts      |


## **🔧 Manual Local Setup (without Docker)**

\> Only if you don't want Docker

### **🖥️ Backend**

```bash
cd BackEnd

npm install

npm start
```


\- Backend runs on: [http://localhost:3002](http://localhost:3002)

Ensure you have MongoDB running locally or update the `.env` with your connection string.

### **💻 Frontend**

```bash
cd FrontEnd/onlinejudge

npm install

npm run dev
```


\- Frontend runs on: [http://localhost:5173](http://localhost:5173)



## **🐳 Docker Setup (Recommended)**

### **Prerequisites**

\- Docker & Docker Compose installed

### **🧪 Quick Start**


# **From the root of the project**
```bash
docker-compose up --build
```


### **⛓️ Ports Used**

| Component | Container Port | Host Port | URL                                  |
|-----------|----------------|-----------|--------------------------------------|
| Backend   | 3002           | 3001      | [http://localhost:3001](http://localhost:3001) |
| Frontend  | 80             | 5173      | [http://localhost:5173](http://localhost:5173) |
| MongoDB   | 27017          | 27017     | `mongodb://localhost:27017`          |

---

### **🗃️ MongoDB Data Persistence**

MongoDB uses Docker volumes so that your data is safe even after shutdown:

```yaml
volumes:
  mongo-data:
```

You can explore it using MongoDB Compass:






## **📬 API Endpoints**

| Method | Endpoint   | Description             |
| ------ | ---------- | ----------------------- |
| POST   | `/signUp`  | Register a new user     |
| POST   | `/login`   | Authenticate a user     |
| POST   | `/submit`  | Submit code for testing |
| GET    | `/results` | Fetch results           |




## **⚖️ License**

MIT License. See `LICENSE` file for details.




