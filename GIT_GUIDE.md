# 🚀 Step-by-Step Git Push Guide (4 Members - Original Structure)

Ye guide follow karke aapke 4 log original project structure (`client/` aur `server/`) ko bina badle, GitHub par har member ka alag-alag commit aur contribution graph dikha sakte hain.

---

## ⚠️ Sabse Zaroori Rule (GitHub Contribution Graph)
GitHub par kisi member ka commit tabhi uski profile par count hota hai jab:
1. Uske terminal me set kiya gaya email (`git config user.email`) wahi email ho jo uske **GitHub Account** me registered hai.
2. Agar email galat hui, to commit to hoga par GitHub us member ki profile/photo/green graph nahi dikhayega.

---

## 📌 Step 1: GitHub Repository Banana (Leader Karega)
1. GitHub par ek naya repository banayein: e.g. `CodingX-FSD-Project`.
2. Repo banne ke baad **Settings -> Collaborators -> Add people** par jaakar baki 3 doston ko invite bhej dein.
3. Un 3 logon ko bolo ki wo apni email se invitation accept kar lein.

---

## 📌 Step 2: Har Member Apne Laptop Par Ye Kare

Aap sabhi ko zip file bhejenge. Har member zip extract karega aur project ke root folder me terminal kholega:

### Har Member Apni Git Identity Set Kare (Sirf Ek Baar):
**Member 1:**
```bash
git config user.name "Member 1 Name"
git config user.email "member1_github_email@gmail.com"
```

**Member 2:**
```bash
git config user.name "Member 2 Name"
git config user.email "member2_github_email@gmail.com"
```

**Member 3:**
```bash
git config user.name "Member 3 Name"
git config user.email "member3_github_email@gmail.com"
```

**Member 4:**
```bash
git config user.name "Member 4 Name"
git config user.email "member4_github_email@gmail.com"
```

---

## 📌 Step 3: Sequence Me Push Karna (Merge Conflict Se Bachne Ke Liye)

Kyunki sabke paas zip file hai, isliye 4 log ek ke baad ek (sequence me) push karein:

### 1️⃣ Member 1 Ka Push (Frontend UI):
Member 1 terminal me ye chalayega:
```bash
git init
git add client/src/components/AdventureMap.jsx client/src/components/Navbar.jsx client/src/pages/HomePage.jsx client/src/index.css client/public/ client/package.json client/vite.config.js client/index.html .gitignore README.md
git commit -m "feat(frontend): setup React app, adventure map, and navigation system"
git branch -M main
git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git
git push -u origin main
```

---

### 2️⃣ Member 2 Ka Push (Workspace & Contests):
Member 2 apne laptop par clone karega ya zip me remote set karega:
```bash
git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git
git pull origin main
git add client/src/pages/ProblemPage.jsx client/src/components/ProblemList.jsx client/src/pages/ContestsPage.jsx client/src/pages/ProfilePage.jsx client/src/services/api.js client/src/App.jsx client/src/main.jsx
git commit -m "feat(editor): added code workspace, problem directory, and user analytics"
git push origin main
```

---

### 3️⃣ Member 3 Ka Push (Backend REST API):
Member 3 apne laptop par terminal me chalayega:
```bash
git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git
git pull origin main
git add server/index.js server/routes/problems.js server/routes/contests.js server/routes/auth.js server/package.json
git commit -m "feat(backend): implemented Express server, API routes, and code execution simulator"
git push origin main
```

---

### 4️⃣ Member 4 Ka Push (Database & Datastores):
Member 4 apne laptop par terminal me chalayega:
```bash
git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git
git pull origin main
git add server/data/problemsData.js server/data/contestsData.js package.json CONTRIBUTORS.md GIT_GUIDE.md
git commit -m "feat(database): curated DSA testcases, starter templates, and contest leaderboard datastores"
git push origin main
```

---

## 📊 Result: GitHub Par Kya Dikhega?
1. **Repository Structure**: Bilkul clean aur original rahega (`client/` aur `server/`).
2. **Commits Tab**: 4 alag-alag commits dikhenge, charon members ke naam ke saath.
3. **Insights -> Contributors**: 4 graph banenge, sabke equal contribution dikhayi denge.
4. **File History**:
   - `AdventureMap.jsx` kholne par Member 1 ka naam dikhega.
   - `ProblemPage.jsx` kholne par Member 2 ka naam dikhega.
   - `server/index.js` kholne par Member 3 ka naam dikhega.
   - `server/data/problemsData.js` kholne par Member 4 ka naam dikhega.
