# CodingX - Full-Stack DSA & Interactive Coding Platform

---

## 🚀 Key Features

- **🗺️ Interactive Coding Adventure Map**: Gamified progression map with 3D stage nodes, path tracking, and cute animated mascots.
- **💻 Full Code Workspace**: Multi-language code editor (JavaScript, Python, C++, Java) with auto-preloaded starter templates.
- **⚡ Simulated Code Execution & Submission**: Run code against sample test cases and submit solutions with instant metrics (Runtime ms, Memory MB, Percentile rank, Verdict).
- **📋 Problem Directory & Filters**: Comprehensive search and filtering by difficulty (*Easy*, *Medium*, *Hard*) and topics (*Arrays*, *Stack*, *Binary Search*, *Linked List*, *DP*).
- **🏆 Contests & Global Leaderboard**: Weekly/biweekly contest schedules, participant registration, and live rating standings.
- **👤 User Analytics & Progress**: Real-time streak tracking, topic distribution breakdown, and recent submission logs.
- **🍃 Local MongoDB Integration**: Automated schema-based persistence for Problems, Contests, Leaderboard, Users, and Submissions with seamless fallback.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Library**: React 18
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Modern Responsive CSS3 (Flexbox/Grid, CSS Variables, Plus Jakarta Sans & JetBrains Mono)
- **Tooling**: Vite Bundler

### Backend (`/server`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Local MongoDB via Mongoose ODM (`mongodb://127.0.0.1:27017/codingx`)
- **Architecture**: Modular MVC RESTful API
- **Middleware**: CORS, Express JSON Parser, Dotenv

---

## 📂 Project Architecture & Structure

```
project/
├── package.json              # Root project scripts
├── README.md                 # Project documentation
├── CONTRIBUTORS.md           # Engineering roles & module distribution
│
├── server/                   # Backend Express Application
│   ├── package.json
│   ├── .env                  # Environment configs (PORT, MONGODB_URI)
│   ├── index.js              # Express app entrypoint & middleware setup
│   ├── config/               # Database connection & auto-seeding
│   │   ├── db.js             # Mongoose connection to local MongoDB
│   │   └── seed.js           # Auto-initialization on startup
│   ├── models/               # Mongoose Schema Models
│   │   ├── Problem.js        # Problem schema with test cases & code templates
│   │   ├── Contest.js        # Contest & Leaderboard schemas
│   │   ├── User.js           # User profile & progress schema
│   │   └── Submission.js     # User code submission logs schema
│   ├── data/                 # Master DSA Datastores & collections
│   │   ├── problemsData.js   # Problem descriptions, testcases & templates
│   │   └── contestsData.js   # Contests schedule & global leaderboard
│   └── routes/               # API route definitions
│       ├── problems.js       # /api/problems (List, Details, Run, Submit)
│       ├── contests.js       # /api/contests & /api/contests/leaderboard
│       └── auth.js           # /api/auth (Profile, Login, Register)
│
└── client/                   # Frontend React Application
    ├── package.json
    ├── vite.config.js        # Vite configuration & proxy setup
    ├── index.html            # Main HTML document
    ├── public/               # Static assets, logos & mascot avatars
    └── src/
        ├── App.jsx           # App shell & React Router routes
        ├── main.jsx          # React DOM root entry
        ├── index.css         # Design system & styles
        ├── components/       # Reusable UI components
        │   ├── Navbar.jsx    # Sticky navigation bar & status pill
        │   ├── AdventureMap.jsx # Interactive 3D map & mascot quest card
        │   └── ProblemList.jsx  # Searchable & filterable problems table
        ├── pages/            # Application views
        │   ├── HomePage.jsx  # Adventure Map + Problem List toggle
        │   ├── ProblemPage.jsx # Code editor workspace & test console
        │   ├── ContestsPage.jsx# Competitive tournaments & leaderboard
        │   └── ProfilePage.jsx # User analytics & streak counter
        └── services/
            └── api.js        # Centralized Axios API client
```

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server status, database connection, and uptime check |
| `GET` | `/api/problems` | List problems with topic, difficulty, and query filtering |
| `GET` | `/api/problems/:idOrSlug` | Detailed problem description, examples, constraints & starter code |
| `POST` | `/api/problems/:id/run` | Execute code against sample test cases |
| `POST` | `/api/problems/:id/submit` | Submit code, persist submission in MongoDB, and receive verdict |
| `GET` | `/api/contests` | Retrieve active, upcoming, and completed contests |
| `GET` | `/api/contests/leaderboard` | Retrieve global ranking and ratings |
| `GET` | `/api/auth/me` | Fetch authenticated user profile & progress metrics |

---

## ⚡ Quick Start Guide

### 1. Ensure Local MongoDB is Running
Make sure MongoDB service is active locally at `mongodb://127.0.0.1:27017`.

### 2. Install Dependencies
Run from the root `project/` directory:
```bash
# Install Server dependencies (Express, Mongoose, CORS, Dotenv)
npm --prefix server install

# Install Client dependencies (React, Vite, Axios)
npm --prefix client install
```

### 3. Start the Backend API Server
```bash
npm --prefix server start
# Backend starts at: http://localhost:5000
# Database automatically connects to local MongoDB & seeds collections
```

### 4. Start the Frontend Development Server
In a separate terminal:
```bash
npm --prefix client run dev
# Frontend starts at: http://localhost:5173
```

Open your browser at **http://codingx007.in** to explore the application!
