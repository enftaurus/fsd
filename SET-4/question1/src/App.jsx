import React, { useState } from 'react';
import { Header, StatWidget, ActivityFeed } from './Components';

export default function App() {
  // Parent state and data
  const [user] = useState({ name: 'Sarah Connor', role: 'Project Manager' });
  const [stats] = useState([
    { title: 'Total Tasks', value: '48', icon: '📋', color: '#3b82f6' },
    { title: 'Completed', value: '36', icon: '✅', color: '#10b981' },
    { title: 'In Progress', value: '12', icon: '⏳', color: '#f59e0b' }
  ]);
  const [activities, setActivities] = useState([
    'Sprint review scheduled for Friday',
    'Updated API documentation for User Service',
    'Deployed release candidate v2.4.0',
    'Fixed authentication cookie issue'
  ]);

  const handleClearActivities = () => {
    setActivities([]);
  };

  return (
    <div style={{ maxWidth: '750px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#1e3a8a' }}>Parent Component Passing Props</h1>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '30px' }}>
        SET-4 Question 1: Single parent passing distinct props to Header, StatWidgets, and ActivityFeed
      </p>

      {/* Passing props to Child 1: Header */}
      <Header appName="DevHub Dashboard" user={user} />

      {/* Passing props to multiple instances of Child 2: StatWidget */}
      <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
        {stats.map((s, idx) => (
          <StatWidget
            key={idx}
            title={s.title}
            value={s.value}
            icon={s.icon}
            color={s.color}
          />
        ))}
      </div>

      {/* Passing props to Child 3: ActivityFeed */}
      <ActivityFeed activities={activities} onClear={handleClearActivities} />
    </div>
  );
}
