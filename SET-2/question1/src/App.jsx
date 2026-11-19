import React from 'react';
import UserCard from './UserCard';

export default function App() {
  // Data in Parent Component to be passed as props
  const users = [
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Full Stack Engineer',
      email: 'alice@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      isActive: true
    },
    {
      id: 2,
      name: 'Bob Smith',
      role: 'UI/UX Designer & Frontend Dev',
      email: 'bob@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      skills: ['Figma', 'CSS3', 'React', 'Tailwind'],
      isActive: false
    },
    {
      id: 3,
      name: 'Charlie Davis',
      role: 'Cloud Architect',
      email: 'charlie@example.com',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Microservices'],
      isActive: true
    }
  ];

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ color: '#1e3a8a', textAlign: 'center' }}>React Props Demonstration</h1>
      <p style={{ textAlign: 'center', color: '#64748b' }}>
        SET-2 Question 1: Parent Component passing props to child functional component
      </p>

      {users.map(user => (
        <UserCard
          key={user.id}
          name={user.name}
          role={user.role}
          email={user.email}
          avatar={user.avatar}
          skills={user.skills}
          isActive={user.isActive}
        />
      ))}
    </div>
  );
}
