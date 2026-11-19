import React, { useState } from 'react';

export default function App() {
  // 1. Numeric state for click count
  const [count, setCount] = useState(0);

  // 2. Boolean state for toggle button
  const [isOn, setIsOn] = useState(false);

  // Handler functions
  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    setCount(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleToggle = () => {
    setIsOn(prev => !prev);
  };

  return (
    <div className="container">
      <h1 className="title">React useState() Demo</h1>
      <p className="subtitle">SET-1 Question 1: Updating State on Button Click</p>

      {/* Counter Demonstration */}
      <div className="card">
        <h3>Counter Example</h3>
        <p>Current Count:</p>
        <div className="counter-value">{count}</div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={handleIncrement}>
            Click to Increment (+1)
          </button>
          <button className="btn btn-secondary" onClick={handleDecrement}>
            Decrement (-1)
          </button>
          <button className="btn btn-danger" onClick={handleReset}>
            Reset (0)
          </button>
        </div>
      </div>

      {/* Toggle State Demonstration */}
      <div className="card">
        <h3>Toggle State Example</h3>
        <button className="btn btn-primary" onClick={handleToggle}>
          Toggle Status
        </button>
        <div>
          <span className={`status-badge ${isOn ? 'status-active' : 'status-inactive'}`}>
            Status: {isOn ? 'ACTIVE (ON)' : 'INACTIVE (OFF)'}
          </span>
        </div>
      </div>
    </div>
  );
}
