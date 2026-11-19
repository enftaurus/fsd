import React from 'react';

// Pure Stateless Functional Component (no useState, no this.state)
// Given the same props, it always renders the exact same output.
export default function GreetingCard({ name, title, department, timeOfDay }) {
  const getGreetingWord = () => {
    switch (timeOfDay?.toLowerCase()) {
      case 'morning': return '🌅 Good Morning';
      case 'afternoon': return '☀️ Good Afternoon';
      case 'evening': return '🌇 Good Evening';
      default: return '👋 Hello & Welcome';
    }
  };

  return (
    <div style={{
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '24px',
      margin: '15px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
      <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '8px' }}>
        {getGreetingWord()}, {name}!
      </div>
      <p style={{ margin: '4px 0', color: '#475569' }}>
        <strong>Designation:</strong> {title}
      </p>
      <p style={{ margin: '4px 0', color: '#475569' }}>
        <strong>Department:</strong> {department}
      </p>
      <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>
        ✔ Stateless & Pure Component Render
      </div>
    </div>
  );
}

// Default Props
GreetingCard.defaultProps = {
  name: 'Valued Colleague',
  title: 'Team Member',
  department: 'Operations',
  timeOfDay: 'day'
};
