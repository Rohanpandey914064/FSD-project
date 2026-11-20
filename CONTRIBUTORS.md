# Project Contributors & Module Ownership

**Project:** CodingX - Full-Stack DSA & Interactive Coding Platform  
**Architecture:** Decoupled Client-Server Architecture (`client/` & `server/`)   

---

## 👥 Module Distribution & Responsibilities

| Contributor | Engineering Role | Assigned Modules & Scope |
|---|---|---|
| **Member 1** | **Frontend UI & Visual Experience** | • Interactive Gamified Adventure Map (`client/src/components/AdventureMap.jsx`)<br>• Responsive Global Navigation Bar (`client/src/components/Navbar.jsx`)<br>• Landing Page & Quest Hero (`client/src/pages/HomePage.jsx`)<br>• Modern CSS3 Design System & Theme Tokens (`client/src/index.css`)<br>• Public Assets & Mascots |
| **Member 2** | **Frontend Workspace & Core Workflows** | • Multi-language Code Editor Workspace (`client/src/pages/ProblemPage.jsx`)<br>• Real-time Problem Directory & Filtering (`client/src/components/ProblemList.jsx`)<br>• Tournament Arena & Leaderboards (`client/src/pages/ContestsPage.jsx`)<br>• User Profile Analytics & Streaks (`client/src/pages/ProfilePage.jsx`)<br>• Centralized Axios API Layer (`client/src/services/api.js`) |
| **Member 3** | **Backend Architecture & Security Services** | • JWT Token Authentication & Bearer Protection Middleware (`server/utils/jwt.js`, `server/middleware/authMiddleware.js`)<br>• User Registration, Bcrypt Hashing & Login Endpoints (`server/routes/auth.js`)<br>• Express Application & Routing Pipeline (`server/index.js`)<br>• Dynamic Problem Evaluation & Submission Linkage (`server/routes/problems.js`)<br>• Contests & Tournament APIs (`server/routes/contests.js`) |
| **Member 4** | **Database Engineering & DSA Engine** | • Local MongoDB Persistence & Mongoose Schemas (`server/models/`)<br>• Curated DSA Problem Testcases & Code Templates (`server/data/problemsData.js`)<br>• Global Rankings & Contest Leaderboard Datastores (`server/data/contestsData.js`)<br>• Automated Database Seeder & Connection Lifecycle (`server/config/`) |

---

## ⚙️ Engineering Standards
- **Version Control**: Git-based collaborative workflow with feature-specific commits.
- **Code Separation**: Strict separation of concerns between client rendering, REST controllers, and database models.
- **Code Quality**: Clean modular ES6+ modules, reusable component architecture, and consistent error handling.
