import React from 'react';

export default function App() {
  // User Data Objects
  const user1 = {
    firstName: 'Jordan',
    lastName: 'Belfort',
    age: 29,
    occupation: 'Financial Analyst',
    country: 'United States',
    birthYear: 1997
  };

  const user2 = {
    firstName: 'Sophia',
    lastName: 'Martinez',
    age: 16,
    occupation: 'High School Student',
    country: 'Canada',
    birthYear: 2010
  };

  // Helper function used in JSX expression
  const checkVotingEligibility = (age) => {
    return age >= 18 ? 'Eligible to Vote' : 'Not Eligible to Vote (Underage)';
  };

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#1e3a8a' }}>JSX Literals & Expressions</h1>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '30px' }}>
        SET-15 Question 1: Displaying user details (name, age) using JavaScript expressions in JSX
      </p>

      {[user1, user2].map((user, index) => (
        <div
          key={index}
          style={{
            background: 'white',
            padding: '24px',
            margin: '20px 0',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
          }}
        >
          {/* 1. JSX Expression: String Concatenation & Template Literals */}
          <h2 style={{ margin: '0 0 10px', color: '#1e293b' }}>
            {`${user.firstName} ${user.lastName}`}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '15px 0' }}>
            {/* 2. JSX Expression: Numeric Variable Embedding */}
            <div>
              <strong>Age:</strong> {user.age} years old
            </div>

            {/* 3. JSX Expression: Arithmetic Computation */}
            <div>
              <strong>Calculated Age Check:</strong> {new Date().getFullYear() - user.birthYear}
            </div>

            <div>
              <strong>Occupation:</strong> {user.occupation.toUpperCase()}
            </div>

            <div>
              <strong>Location:</strong> {user.country}
            </div>
          </div>

          {/* 4. JSX Expression: Ternary Conditional Operator */}
          <div style={{ marginTop: '12px' }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              background: user.age >= 18 ? '#dcfce7' : '#fee2e2',
              color: user.age >= 18 ? '#15803d' : '#b91c1c'
            }}>
              {user.age >= 18 ? 'Adult Account' : 'Minor Account'}
            </span>
            <span style={{ marginLeft: '10px', color: '#64748b', fontSize: '0.9rem' }}>
              &bull; {checkVotingEligibility(user.age)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
