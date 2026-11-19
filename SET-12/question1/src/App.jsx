import React from 'react';
import GreetingCard from './GreetingCard';

export default function App() {
  const teamMembers = [
    { id: 1, name: 'Dr. Evelyn Reed', title: 'Principal Scientist', department: 'Biotechnology', timeOfDay: 'morning' },
    { id: 2, name: 'Marcus Vance', title: 'DevOps Lead', department: 'Infrastructure', timeOfDay: 'afternoon' },
    { id: 3, name: 'Priya Patel', title: 'Data Analyst', department: 'Business Intelligence', timeOfDay: 'evening' }
  ];

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#1e3a8a' }}>Stateless Functional Component</h1>
      <p style={{ textAlign: 'center', color: '#64748b' }}>
        SET-12 Question 1: Displays greeting messages using pure stateless components
      </p>

      {teamMembers.map(member => (
        <GreetingCard
          key={member.id}
          name={member.name}
          title={member.title}
          department={member.department}
          timeOfDay={member.timeOfDay}
        />
      ))}
    </div>
  );
}
