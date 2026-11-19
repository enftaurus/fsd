import React from 'react';

// Child Functional Component receiving props via destructuring
export default function UserCard({ name, role, email, avatar, skills, isActive }) {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '20px',
      margin: '15px 0',
      background: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img
          src={avatar}
          alt={name}
          style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <h3 style={{ margin: 0, color: '#1e293b' }}>{name}</h3>
          <p style={{ margin: '4px 0', color: '#64748b', fontSize: '0.9rem' }}>{role} &bull; {email}</p>
          <span style={{
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: '12px',
            fontWeight: 'bold',
            background: isActive ? '#dcfce7' : '#fee2e2',
            color: isActive ? '#15803d' : '#b91c1c'
          }}>
            {isActive ? 'ACTIVE' : 'AWAY'}
          </span>
        </div>
      </div>

      <div style={{ marginTop: '12px' }}>
        <strong>Skills:</strong>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
          {skills.map((skill, index) => (
            <span key={index} style={{
              background: '#e0e7ff',
              color: '#4338ca',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.8rem'
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Default Props
UserCard.defaultProps = {
  isActive: true,
  skills: []
};
