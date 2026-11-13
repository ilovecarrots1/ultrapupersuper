import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import StudiesPage from './pages/StudiesPage';
import CompoundsPage from './pages/CompoundsPage';
import MapPage from './pages/MapPage';
import BrainPage from './pages/BrainPage';
import LearnPage from './pages/LearnPage';
import NotebookPage from './pages/NotebookPage';
import ShopPage from './pages/ShopPage';
import BrowsePage from './pages/BrowsePage';
import TodayPage from './pages/TodayPage';
import CitationPage from './pages/CitationPage';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-bg-page text-text-primary overflow-hidden">
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/studies" replace />} />
            <Route path="/studies" element={<StudiesPage />} />
            <Route path="/today" element={<TodayPage />} />
            <Route path="/citation" element={<CitationPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/brain" element={<BrainPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/compounds" element={<CompoundsPage />} />
            <Route path="/notebook" element={<NotebookPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/browse" element={<BrowsePage />} />
          </Routes>
          <footer className="border-t border-border px-6 py-4 text-center">
            <p className="text-text-meta text-xs">
              NeuroDifference is an information resource, not medical advice.
            </p>
            <p className="text-text-meta text-xs mt-1">
              evidence · compounds · pathways
            </p>
          </footer>
        </main>
      </div>
    </BrowserRouter>
  );
}
