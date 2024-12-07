import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import PrayerTimes from './components/PrayerTimes';
import Events from './components/Events';
import LocationSelector from './components/LocationSelector';
import PillarsOfIslam from './components/PillarsOfIslam';
import Footer from './components/Footer';
import AdminLayout from './components/admin/AdminLayout';
import AuthPage from './pages/admin/AuthPage';
import DashboardPage from './pages/admin/DashboardPage';
import MosquesPage from './pages/admin/MosquesPage';
import Home from './pages/Home'; 
import DubaiPage from './pages/Dubai';
import AbuDhabiPage from './pages/AbuDhabi';
import { PrayerProvider } from './contexts/PrayerContext';

const MainLayout = () => (
  <>
    <Header />
    <Hero />
    <Welcome />
    <PrayerTimes />
    <PillarsOfIslam />
    <Events />
    <LocationSelector />
    <Footer />
  </>
);

function App() {
  return (
    <PrayerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/dubai" element={<DubaiPage />} />
          <Route path="/abu-dhabi" element={<AbuDhabiPage />} />
          <Route path="/admin/auth" element={<AuthPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="mosques" element={<MosquesPage />} />
            {/* Add more admin routes here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </PrayerProvider>
  );
}

export default App;