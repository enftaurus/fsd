import React, { useState } from 'react';

export default function App() {
  const [clickCount, setClickCount] = useState(0);

  // Click Event Handlers
  const handleSingleClick = (e) => {
    // React SyntheticEvent
    setClickCount(prev => prev + 1);
  };

  const handleAddFive = () => {
    setClickCount(prev => prev + 5);
  };

  const handleReset = () => {
    setClickCount(0);
  };

  return (
    <div style={{ maxWidth: '550px', margin: '50px auto', padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1e3a8a' }}>Button Click Event Counter</h1>
      <p style={{ color: '#64748b' }}>SET-14 Question 1: Handling Click Events and Counting Clicks</p>

      {/* Counter Display */}
      <div style={{ margin: '30px 0', padding: '25px', background: '#f1f5f9', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 10px', color: '#64748b', fontSize: '1rem' }}>Total Button Clicks:</p>
        <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#2563eb' }}>
          {clickCount}
        </div>
        <small style={{ color: '#94a3b8' }}>
          {clickCount === 0 ? 'No clicks recorded yet.' : `Button has been clicked ${clickCount} time${clickCount > 1 ? 's' : ''}.`}
        </small>
      </div>

      {/* Buttons triggering click events */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={handleSingleClick}
          style={{ padding: '12px 24px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
        >
          Click Me (+1)
        </button>
        <button
          onClick={handleAddFive}
          style={{ padding: '12px 18px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          +5 Boost
        </button>
        <button
          onClick={handleReset}
          style={{ padding: '12px 18px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
