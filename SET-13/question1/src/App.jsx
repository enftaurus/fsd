import React, { useState } from 'react';

export default function App() {
  // Preset array of colors
  const colors = [
    { name: 'Royal Blue', hex: '#2563eb' },
    { name: 'Emerald Green', hex: '#10b981' },
    { name: 'Crimson Red', hex: '#ef4444' },
    { name: 'Vibrant Purple', hex: '#8b5cf6' },
    { name: 'Amber Orange', hex: '#f59e0b' },
    { name: 'Hot Pink', hex: '#ec4899' },
    { name: 'Teal', hex: '#14b8a6' }
  ];

  // State tracking current color index
  const [colorIndex, setColorIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const currentColor = colors[colorIndex];

  // Handler to cycle to next color
  const handleColorChange = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    setClickCount((prev) => prev + 1);
  };

  // Handler to generate random color
  const handleRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setColorIndex(randomIndex);
    setClickCount((prev) => prev + 1);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1e3a8a', marginBottom: '8px' }}>Dynamic Color State Demo</h1>
      <p style={{ color: '#64748b' }}>
        SET-13 Question 1: Text color dynamically changes each time button is clicked
      </p>

      {/* Dynamic Colored Text */}
      <div style={{
        margin: '35px 0',
        padding: '30px',
        background: '#f8fafc',
        borderRadius: '10px',
        border: `3px solid ${currentColor.hex}`,
        transition: 'all 0.3s ease'
      }}>
        <h2 style={{
          color: currentColor.hex,
          fontSize: '2.2rem',
          margin: 0,
          transition: 'color 0.3s ease'
        }}>
          Dynamic Text Color in React!
        </h2>
        <p style={{ marginTop: '12px', color: '#475569', fontSize: '1.1rem' }}>
          Current Color: <strong style={{ color: currentColor.hex }}>{currentColor.name}</strong> ({currentColor.hex})
        </p>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={handleColorChange}
          style={{
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '6px',
            border: 'none',
            background: currentColor.hex,
            color: 'white',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}
        >
          Change Color (Next &rarr;)
        </button>
        <button
          onClick={handleRandomColor}
          style={{
            padding: '12px 20px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            background: '#f1f5f9',
            color: '#334155',
            cursor: 'pointer'
          }}
        >
          Random Color 🎲
        </button>
      </div>

      <p style={{ marginTop: '25px', color: '#94a3b8', fontSize: '0.9rem' }}>
        Total button clicks: <strong>{clickCount}</strong>
      </p>
    </div>
  );
}
