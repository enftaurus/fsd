import React, { useState, useEffect } from 'react';

// Child component with timer and cleanup function
export default function TimerWidget({ onLog }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    onLog('🔵 [TimerWidget] Mounted: Starting setInterval() timer (ID created)');

    // Start timer interval
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // ========================================================
    // CLEANUP FUNCTION: Executes when the component unmounts
    // or before re-running the effect
    // ========================================================
    return () => {
      clearInterval(intervalId);
      onLog('🔴 [TimerWidget] Unmounted: Cleaned up and cleared setInterval() timer (Prevented Memory Leak!)');
    };
  }, []); // Empty dependency array ensures timer runs on mount and cleans up on unmount

  return (
    <div style={{
      padding: '24px',
      background: '#eff6ff',
      borderRadius: '8px',
      border: '2px dashed #3b82f6',
      textAlign: 'center',
      margin: '20px 0'
    }}>
      <h3 style={{ margin: '0 0 10px', color: '#1e40af' }}>Active Timer Component</h3>
      <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1d4ed8' }}>
        {seconds} <span style={{ fontSize: '1.2rem', fontWeight: 'normal' }}>seconds</span>
      </div>
      <p style={{ color: '#475569', fontSize: '0.9rem', margin: '8px 0 0' }}>
        ⏱️ Timer is ticking every 1000ms. Toggle the button below to unmount this component and trigger the cleanup function!
      </p>
    </div>
  );
}
