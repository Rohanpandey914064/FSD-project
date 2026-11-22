# CodingX - Full-Stack DSA & Interactive Coding Platform

CodingX is a modern, full-stack, gamified coding and Data Structures & Algorithms (DSA) platform built with React and Node.js/Express, powered strictly by a local MongoDB database and featuring a dynamic multi-language code execution engine.

---

##  Key Features

- ** Interactive Coding Adventure Map**: Gamified progression map with 3D stage nodes, path tracking, and animated mascots.
- ** Clean Code Workspace**: Interactive code editor for JavaScript, Python, C++, and Java. Starts blank for authentic coding practice with optional boilerplate loading (`Template 📋`) and `Clear 🗑️` controls.
- ** Real Universal Code Execution Engine**: Dynamic code evaluation engine with **zero problem-specific hardcoding**:
  - **JavaScript**: Sandboxed execution using `node:vm` with strict memory and execution timeouts (1000ms).
  - **Python**: Dynamic harness execution via Python 3 CLI with automated output normalization.
  - **C++ & Java**: Algorithmic structure and logic validation with syntax-aware analysis.
- **Problem Directory & Filters**: Comprehensive search and filtering by difficulty (*Easy*, *Medium*, *Hard*) and topics (*Arrays*, *Stack*, *Binary Search*, *Linked List*, *DP*, *Math*).
- ** Contests & Global Leaderboard**: Weekly/biweekly contest schedules, participant registration, and live rating standings.
- ** User Analytics & Progress**: Real-time streak tracking, topic distribution breakdown, and recent submission logs.
- ** 100% Strict MongoDB Persistence**: Direct database architecture with Mongoose ODM — zero mock files or in-memory arrays. All data queries and submissions run strictly against MongoDB.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Library**: React 18
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Modern Responsive CSS3 (CSS Variables, Plus Jakarta Sans & JetBrains Mono)
- **Tooling**: Vite Bundler

### Backend (`/server`)
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: Local MongoDB via Mongoose ODM (`mongodb://127.0.0.1:27017/codingx`)
- **Authentication**: HTTP-Only Cookie Sessions backed by signed JWT (JSON Web Tokens) with 7-day expiration & `bcryptjs` password hashing (Salt Rounds: 10)
- **Sandbox**: Node.js `vm` module & Python CLI execution
- **Architecture**: Modular RESTful API
- **Middleware**: Cookie-Parser, JWT Auth Guard (`authMiddleware`), CORS with Credentials, Express JSON Parser, Dotenv

---

## 📂 Project Architecture & Structure

```
project/
├── package.json              # Root project scripts (install:all, server, client, build)
├── README.md                 # Complete project documentation
├── CONTRIBUTORS.md           # Engineering roles & module distribution
│
├── server/                   # Backend Express & MongoDB Application
│   ├── package.json
│   ├── .env                  # Environment configs (PORT, MONGODB_URI)
│   ├── .env.example          # Environment template
│   ├── index.js              # Express app entrypoint & MongoDB connection
│   ├── config/               # Database configuration & seeding
│   │   ├── db.js             # Strict Mongoose connection to local MongoDB
│   │   └── seed.js           # Auto-seeds local MongoDB for new setups/clones
│   ├── data/                 # Seed datasets (used for automated DB initialization)
│   │   ├── problemsData.js   # Master problem specifications & test cases
│   │   └── contestsData.js   # Contests schedule & initial leaderboard
│   ├── models/               # Mongoose Schema Models
│   │   ├── Problem.js        # Problem schema with test cases & code templates
│   │   ├── Contest.js        # Contest & Leaderboard schemas
│   │   ├── User.js           # User profile & progress schema
│   │   └── Submission.js     # User code submission logs schema
│   ├── routes/               # REST API route handlers
│   │   ├── problems.js       # /api/problems (List, Details, Run, Submit)
│   │   ├── contests.js       # /api/contests & /api/contests/leaderboard
│   │   └── auth.js           # /api/auth (User profile & analytics)
│   └── utils/
│       └── codeRunner.js     # Universal dynamic multi-language code runner
│
└── client/                   # Frontend React Application
    ├── package.json
    ├── vite.config.js        # Vite configuration & proxy setup
    ├── index.html            # Main HTML document
    ├── public/               # Static assets, logos & mascot avatars
    │   ├── adventure-map.jpg
    │   ├── codingx-logo-transparent.png
    │   ├── profile-icon.png
    │   └── mascots/          # Active mascot graphics
    └── src/
        ├── App.jsx           # App layout & React Router configuration
        ├── main.jsx          # React DOM root entry
        ├── index.css         # Dark-themed coding design system & responsive layout
        ├── components/       # Reusable UI components
        │   ├── Navbar.jsx    # Navigation bar & system status indicator
        │   ├── AdventureMap.jsx # Interactive 3D map & mascot quest card
        │   └── ProblemList.jsx  # Searchable & filterable problems table
        ├── pages/            # Application views
        │   ├── HomePage.jsx  # Adventure Map + Problem Directory
        │   ├── ProblemPage.jsx # Code editor workspace & test console
        │   ├── ContestsPage.jsx# Competitive tournaments & leaderboard
        │   └── ProfilePage.jsx # User analytics & streak counter
        └── services/
            └── api.js        # Centralized Axios API client
```

---

## 📡 REST API Reference

All endpoints query strictly from MongoDB:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server status, database connection, and uptime check |
| `GET` | `/api/problems` | List problems with topic, difficulty, and query filtering |
| `GET` | `/api/problems/:idOrSlug` | Detailed problem description, test cases & starter templates |
| `POST` | `/api/problems/:id/run` | Execute code against test cases in real sandbox |
| `POST` | `/api/problems/:id/submit` | Submit code, evaluate all tests, and persist submission in MongoDB |
| `GET` | `/api/contests` | Retrieve active, upcoming, and completed contests |
| `GET` | `/api/contests/leaderboard` | Retrieve global ranking and ratings |
| `GET` | `/api/auth/me` | Fetch authenticated user profile & progress metrics (Protected by JWT) |
| `POST` | `/api/auth/register` | Register new user with bcrypt password hashing & JWT issuance |
| `POST` | `/api/auth/login` | Authenticate user credentials and return signed JWT Bearer token |
| `POST` | `/api/auth/logout` | Clear user authentication session |

---

## 🔐 Authentication & Teacher Viva Testing Guide

### 1. Pre-configured Demo Account
- **Email:** `developer@codingx.com`
- **Password:** `password123`

### 2. Testing via Web Interface
1. Open **http://localhost:5173**.
2. Click the **Sign In** button in the top-right navbar.
3. Switch to **Register** tab: enter a new username, email, and password (min 6 characters).
4. Notice how the navbar immediately updates to show your custom username and personal solved counts.
5. Click **Logout**: the session is cleared, and navbar resets to guest mode.
6. Click **Sign In**: enter `developer@codingx.com` and `password123` to test existing user login.

### 3. Testing via cURL / Postman (Backend Demonstration)
- **Register User:**
  ```bash
  curl -X POST http://localhost:5000/api/auth/register \
    -H "Content-Type: application/json" \
    -d "{\"username\": \"test_coder\", \"email\": \"test@codingx.com\", \"password\": \"secret123\"}"
  ```
- **Login User:**
  ```bash
  curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"developer@codingx.com\", \"password\": \"password123\"}"
  ```
- **Access Protected Route with Bearer Token:**
  ```bash
  curl http://localhost:5000/api/auth/me \
    -H "Authorization: Bearer <TOKEN_RETURNED_FROM_LOGIN>"
  ```

---

## ⚡ Quick Start Guide

### 1. Ensure Local MongoDB is Running
Make sure MongoDB service is active locally on the default port:
```bash
mongodb://127.0.0.1:27017/codingx
```

### 2. Install Dependencies
Run from the root directory:
```bash
# Install both server and client dependencies in one command
npm run install:all
```

### 3. Start the Backend API Server
```bash
npm run server
# Backend starts at: http://localhost:5000
# Connects strictly to MongoDB: mongodb://127.0.0.1:27017/codingx
```

### 4. Start the Frontend Development Server
In a separate terminal:
```bash
npm run client
# Frontend starts at: http://localhost:5173
```

Open your browser at **http://localhost:5173** to use the platform!
