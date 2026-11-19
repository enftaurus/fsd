import React from 'react';

// Child Component 1: Header
export function Header({ appName, user }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', background: '#1e3a8a', color: 'white', borderRadius: '8px' }}>
      <h2 style={{ margin: 0 }}>{appName}</h2>
      <div>Welcome, <strong>{user.name}</strong> ({user.role})</div>
    </header>
  );
}

// Child Component 2: Stat Card
export function StatWidget({ title, value, icon, color }) {
  return (
    <div style={{ flex: 1, padding: '20px', background: 'white', borderRadius: '8px', borderLeft: `4px solid ${color}`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: '1.8rem' }}>{icon}</div>
      <h3 style={{ margin: '8px 0 4px', color: '#1e293b' }}>{value}</h3>
      <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>{title}</p>
    </div>
  );
}

// Child Component 3: Action Feed
export function ActivityFeed({ activities, onClear }) {
  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, color: '#1e293b' }}>Recent Activities</h3>
        <button onClick={onClear} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}>
          Clear
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
        {activities.map((act, idx) => (
          <li key={idx} style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', color: '#475569', fontSize: '0.9rem' }}>
            &bull; {act}
          </li>
        ))}
      </ul>
    </div>
  );
}
