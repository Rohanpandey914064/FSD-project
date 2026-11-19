import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProblemPage } from './pages/ProblemPage';
import { ContestsPage } from './pages/ContestsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProblemList } from './components/ProblemList';

export function App() {
  return (
    <div className="app-layout">
      <Navbar solvedCount={24} totalCount={150} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/problems" element={<HomePage />} />
          <Route path="/problems/:idOrSlug" element={<ProblemPage />} />
          <Route path="/contests" element={<ContestsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
