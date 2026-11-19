import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

// Page 1: Home Page
function HomePage() {
  return (
    <div>
      <h2 style={{ color: '#1e3a8a' }}>🏠 Home Page</h2>
      <p>Welcome to our modern React multi-page application!</p>
      <p>React Router enables seamless navigation without reloading the browser page.</p>
    </div>
  );
}

// Page 2: About Page
function AboutPage() {
  return (
    <div>
      <h2 style={{ color: '#1e3a8a' }}>ℹ️ About Us</h2>
      <p>We build robust Full Stack Web Applications using MERN (MongoDB, Express, React, Node.js).</p>
      <ul>
        <li>Client-side routing via React Router DOM</li>
        <li>Component-based UI architecture</li>
        <li>High performance Virtual DOM reconciliation</li>
      </ul>
    </div>
  );
}

// Page 3: Services Page
function ServicesPage() {
  return (
    <div>
      <h2 style={{ color: '#1e3a8a' }}>🛠️ Our Services</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
        <div style={{ padding: '15px', background: '#eff6ff', borderRadius: '8px' }}>
          <h4>Frontend Development</h4>
          <p style={{ fontSize: '0.85rem' }}>React, Vite, Single Page Applications</p>
        </div>
        <div style={{ padding: '15px', background: '#f0fdf4', borderRadius: '8px' }}>
          <h4>Backend APIs</h4>
          <p style={{ fontSize: '0.85rem' }}>Node.js, Express, RESTful Microservices</p>
        </div>
      </div>
    </div>
  );
}

// Page 4: Contact Page
function ContactPage() {
  return (
    <div>
      <h2 style={{ color: '#1e3a8a' }}>📬 Contact Us</h2>
      <p>Email: contact@fsd-lab.example.com</p>
      <p>Phone: +1 (555) 019-2834</p>
      <p>Address: Tech Hub, Silicon Valley, CA</p>
    </div>
  );
}

// Page 5: 404 Not Found
function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1 style={{ color: '#ef4444' }}>404 - Page Not Found</h1>
      <p>The URL route you are looking for does not exist.</p>
      <NavLink to="/" style={{ color: '#2563eb', fontWeight: 'bold' }}>&larr; Return to Home</NavLink>
    </div>
  );
}

export default function App() {
  const navStyle = ({ isActive }) => ({
    padding: '8px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    background: isActive ? '#2563eb' : 'transparent',
    color: isActive ? 'white' : '#64748b',
    transition: 'all 0.2s'
  });

  return (
    <BrowserRouter>
      <div style={{ maxWidth: '750px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: '#1e3a8a' }}>Multi-Page App with React Router</h1>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '25px' }}>
          SET-12 Question 2: Client-side routing with BrowserRouter, Routes, Route, and NavLink
        </p>

        {/* Navigation Bar */}
        <nav style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          background: 'white',
          padding: '12px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          marginBottom: '25px'
        }}>
          <NavLink to="/" style={navStyle}>Home</NavLink>
          <NavLink to="/about" style={navStyle}>About</NavLink>
          <NavLink to="/services" style={navStyle}>Services</NavLink>
          <NavLink to="/contact" style={navStyle}>Contact</NavLink>
        </nav>

        {/* Content Box with Routes */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          minHeight: '220px'
        }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
