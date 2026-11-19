import React, { useState } from 'react';

export default function App() {
  const [names, setNames] = useState([
    'Alexander Hamilton',
    'Beatrix Potter',
    'Charles Darwin',
    'Dorothy Vaughan',
    'Eleanor Roosevelt',
    'Franklin D. Roosevelt',
    'Grace Hopper'
  ]);

  const [newName, setNewName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddName = (e) => {
    e.preventDefault();
    if (newName.trim()) {
      setNames([...names, newName.trim()]);
      setNewName('');
    }
  };

  const filteredNames = names.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#1e3a8a', textAlign: 'center' }}>Rendering Lists with map()</h2>
      <p style={{ color: '#64748b', textAlign: 'center' }}>SET-3 Question 1: List of Names</p>

      {/* Add Name Form */}
      <form onSubmit={handleAddName} style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Enter a new name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />
        <button
          type="submit"
          style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Add
        </button>
      </form>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search names..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
      />

      {/* List rendered using .map() */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filteredNames.map((name, index) => (
          <li
            key={index}
            style={{
              padding: '12px 16px',
              margin: '6px 0',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <span style={{ fontWeight: 500, color: '#1e293b' }}>
              <span style={{ color: '#94a3b8', marginRight: '10px' }}>#{index + 1}</span>
              {name}
            </span>
            <span style={{ fontSize: '0.8rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '12px' }}>
              Rendered via map()
            </span>
          </li>
        ))}
      </ul>
      {filteredNames.length === 0 && (
        <p style={{ textAlign: 'center', color: '#94a3b8' }}>No names match your search.</p>
      )}
    </div>
  );
}
