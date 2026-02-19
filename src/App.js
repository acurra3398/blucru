import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GreenGang from './pages/GreenGang';
import OurRobots from './pages/OurRobots';
import Outreach from './pages/Outreach';
import JoinBluCru from './pages/JoinBluCru';
import Sponsors from './pages/Sponsors';
import Media from './pages/Media';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/green-gang" element={<GreenGang />} />
            <Route path="/our-robots" element={<OurRobots />} />
            <Route path="/outreach" element={<Outreach />} />
            <Route path="/join" element={<JoinBluCru />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
