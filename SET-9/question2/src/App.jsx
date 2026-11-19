import React, { useState } from 'react';
import TimerWidget from './TimerWidget';

export default function App() {
  const [showTimer, setShowTimer] = useState(true);
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 15)]);
  };

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#1e3a8a' }}>React useEffect Cleanup Function</h1>
      <p style={{ textAlign: 'center', color: '#64748b' }}>
        SET-9 Question 2: Starting a timer in useEffect and clearing it on unmount
      </p>

      {/* Mount / Unmount Toggle Button */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button
          onClick={() => setShowTimer(!showTimer)}
          style={{
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            background: showTimer ? '#ef4444' : '#10b981',
            color: 'white'
          }}
        >
          {showTimer ? '❌ Unmount Timer Component' : '✅ Mount Timer Component'}
        </button>
      </div>

      {/* Conditionally rendered timer component */}
      {showTimer ? (
        <TimerWidget onLog={addLog} />
      ) : (
        <div style={{ padding: '24px', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca', textAlign: 'center', color: '#b91c1c' }}>
          <strong>Component is currently UNMOUNTED.</strong>
          <br/>The cleanup function was called and the interval was safely cleared!
        </div>
      )}

      {/* Real-time Lifecycle Logs */}
      <div style={{ marginTop: '30px', background: '#1e293b', color: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <strong style={{ color: '#38bdf8' }}>Lifecycle & Cleanup Logs:</strong>
          <button onClick={() => setLogs([])} style={{ background: '#334155', color: '#cbd5e1', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Clear</button>
        </div>
        <div style={{ maxHeight: '200px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.85rem' }}>
          {logs.length === 0 ? (
            <span style={{ color: '#64748b' }}>Logs will appear here when mounting and unmounting...</span>
          ) : (
            logs.map((log, i) => <div key={i} style={{ padding: '3px 0' }}>{log}</div>)
          )}
        </div>
      </div>
    </div>
  );
}
