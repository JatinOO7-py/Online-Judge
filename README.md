-  My Online Judge

An \*\*Online Judge\*\* platform where users can submit code in multiple languages (C++, Java, Python), get it com This project features:

- nnn Code editor with syntax highlighting for multiple languages
- n Code submission and execution engine
- n Evaluation based on predefined test cases
- n User roles (admin, user) and secure login/signup
- n Full-stack architecture (MongoDB + Node.js + React + Docker)

\---

\## nn Demo

- [Watch Demo Video](#)  

\*(Replace  #  with actual YouTube or Drive link)\*

\---

\## n Project Structure

project-root/

n

nnn BackEnd/                   # Node.js backend with code execution logic

- nnn index.js
- nnn Dockerfile
- nnn .env                   # For MongoDB URI, ports, etc.

n

nnn FrontEnd/

- nnn onlinejudge/           # Vite + React frontend
- nnn Dockerfile
- nnn vite.config.js
- nnn src/

n

nnn docker-compose.yml         # Spin up MongoDB, backend, and frontend nnn README.md

\---

\## n Features

| Feature | Description |

\|--------|-------------|

| -n Code Editor | Built with  @uiw/react-codemirror  and CodeMirror syntax support |

| nn Language Support | C++, Java, Python (compiled and executed in backend container) | | n API Backend | Express-based backend connected to MongoDB |

| n User Management | Signup/Login with roles and secure password hashing |

| n Dockerized | Fully containerized using Docker Compose |

| n Persistent MongoDB | All data is stored in Docker volumes and is preserved across restarts |

\---

\## n Manual Local Setup (without Docker) > Only if you don't want Docker ### nn Backend

`   `bash

cd BackEnd npm install npm start

- Backend runs on: [http://localhost:3002](http://localhost:3002)

Ensure you have MongoDB running locally or update the  .env  with your connection string. ### n Frontend

`   `bash

cd FrontEnd/onlinejudge npm install

npm run dev

- Frontend runs on: [http://localhost:5173](http://localhost:5173) ---

  ## n Docker Setup (Recommended)

  ### Prerequisites

- Docker & Docker Compose installed

\### n Quick Start

`   `bash

- From the root of the project docker-compose up --build

  ### nn Ports Used

  | Component | Container Port | Host Port | URL | |----------|----------------|-----------|-----|

  | Backend  | 3002           | 3001      | [http://localhost:3001](http://localhost:3001) | | Frontend | 80             | 5173      | [http://localhost:5173](http://localhost:5173) |

  | MongoDB  | 27017          | 27017     |  mongodb://localhost:27017  |

  ### nn MongoDB Data Persistence

  MongoDB uses Docker volumes so that your data is safe even after shutdown:

  `   `yaml volumes:

  `  `mongo-data:

  You can explore it using MongoDB Compass: mongodb://localhost:27017

  ---

  ## n API Endpoints

  | Method | Endpoint       | Description             | |--------|----------------|-------------------------|

  | POST   |  /signUp       | Register a new user     | | POST   |  /login        | Authenticate a user     |

  | POST   |  /submit       | Submit code for testing | | GET    |  /results      | Fetch results           |

  ---

  ## n Contributing

  Contributions are welcome! To contribute:

1. Fork the repository
1. Create a new branch ( git checkout -b feature-x )
1. Commit your changes
1. Push to the branch ( git push origin feature-x )
1. Open a Pull Request

\---

\## nn License

MIT License. See  LICENSE  file for details. ---

\## nnnn Questions?

If you have any issues, feel free to open an [Issue](https://github.com/your-repo/issues) or reach out via the
# Online-Judge
