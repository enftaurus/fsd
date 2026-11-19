import React, { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([
    { id: 1, text: 'Review React documentation' },
    { id: 2, text: 'Build REST API with Express' },
    { id: 3, text: 'Practice MongoDB CRUD queries' }
  ]);
  const [inputValue, setInputValue] = useState('');

  // 1. ADD ITEM
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newItem = {
      id: Date.now(),
      text: inputValue.trim()
    };

    setItems([...items, newItem]);
    setInputValue('');
  };

  // 2. REMOVE ITEM
  const handleRemoveItem = (idToRemove) => {
    setItems(items.filter(item => item.id !== idToRemove));
  };

  // 3. CLEAR ALL
  const handleClearAll = () => {
    setItems([]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '25px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1e3a8a', textAlign: 'center' }}>Dynamic Item List Manager</h1>
      <p style={{ color: '#64748b', textAlign: 'center' }}>
        SET-14 Question 2: Input items with buttons to add and remove items dynamically
      </p>

      {/* Input & Add Form */}
      <form onSubmit={handleAddItem} style={{ display: 'flex', gap: '8px', margin: '25px 0' }}>
        <input
          type="text"
          placeholder="Enter item name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ flex: 1, padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '1rem' }}
        />
        <button
          type="submit"
          style={{ padding: '12px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Add Item
        </button>
      </form>

      {/* Items Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <strong style={{ color: '#334155' }}>Items ({items.length})</strong>
        {items.length > 0 && (
          <button
            onClick={handleClearAll}
            style={{ padding: '4px 10px', background: '#f1f5f9', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Dynamic List */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, index) => (
          <li
            key={item.id}
            style={{
              padding: '12px 16px',
              margin: '8px 0',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span style={{ color: '#1e293b' }}>
              <span style={{ color: '#94a3b8', marginRight: '8px' }}>{index + 1}.</span>
              {item.text}
            </span>
            <button
              onClick={() => handleRemoveItem(item.id)}
              style={{ padding: '6px 12px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Remove ✕
            </button>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p style={{ textAlign: 'center', color: '#94a3b8', padding: '30px 0' }}>
          Your list is currently empty. Add some items above!
        </p>
      )}
    </div>
  );
}
