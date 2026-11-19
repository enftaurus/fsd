import React, { useState } from 'react';

export default function App() {
  // Form Values State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});
  // Touched state to only show errors once user starts typing
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Email regex format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Real-time validator
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'username':
        if (!value.trim()) {
          error = 'Username is required.';
        } else if (value.trim().length < 3) {
          error = 'Username must be at least 3 characters long.';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required.';
        } else if (!emailRegex.test(value.trim())) {
          error = 'Please enter a valid email address (e.g. user@example.com).';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required.';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters long.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Change handler with instant real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));

    // Run real-time validation on this field
    const fieldError = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Check if form is valid overall
  const isFormValid =
    formData.username.trim().length >= 3 &&
    emailRegex.test(formData.email.trim()) &&
    formData.password.length >= 8 &&
    !errors.username &&
    !errors.email &&
    !errors.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto', padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1e3a8a', textAlign: 'center', margin: '0 0 8px' }}>Real-Time Form Validation</h1>
      <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '25px', fontSize: '0.95rem' }}>
        SET-15 Question 2: Validates Required Fields, Email Format & Min Length
      </p>

      {submitted ? (
        <div style={{ padding: '24px', background: '#dcfce7', border: '1px solid #86efac', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ color: '#15803d', margin: '0 0 10px' }}>🎉 Form Submitted Successfully!</h3>
          <p style={{ margin: 0, color: '#166534' }}>
            Welcome, <strong>{formData.username}</strong>! Your account has been registered with {formData.email}.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ username: '', email: '', password: '' });
              setTouched({});
              setErrors({});
            }}
            style={{ marginTop: '15px', padding: '8px 16px', background: '#15803d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Register Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Field 1: Username */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
              Username <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Min 3 characters"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '10px',
                borderRadius: '6px',
                border: `1px solid ${touched.username && errors.username ? '#ef4444' : touched.username && !errors.username ? '#10b981' : '#cbd5e1'}`,
                outline: 'none'
              }}
            />
            {touched.username && errors.username && (
              <small style={{ color: '#ef4444', display: 'block', marginTop: '4px' }}>
                ⚠️ {errors.username}
              </small>
            )}
            {touched.username && !errors.username && (
              <small style={{ color: '#10b981', display: 'block', marginTop: '4px' }}>
                ✔ Valid username
              </small>
            )}
          </div>

          {/* Field 2: Email */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
              Email Address <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. name@domain.com"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '10px',
                borderRadius: '6px',
                border: `1px solid ${touched.email && errors.email ? '#ef4444' : touched.email && !errors.email ? '#10b981' : '#cbd5e1'}`,
                outline: 'none'
              }}
            />
            {touched.email && errors.email && (
              <small style={{ color: '#ef4444', display: 'block', marginTop: '4px' }}>
                ⚠️ {errors.email}
              </small>
            )}
            {touched.email && !errors.email && (
              <small style={{ color: '#10b981', display: 'block', marginTop: '4px' }}>
                ✔ Valid email format
              </small>
            )}
          </div>

          {/* Field 3: Password */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
              Password <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Min 8 characters"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '10px',
                borderRadius: '6px',
                border: `1px solid ${touched.password && errors.password ? '#ef4444' : touched.password && !errors.password ? '#10b981' : '#cbd5e1'}`,
                outline: 'none'
              }}
            />
            {touched.password && errors.password && (
              <small style={{ color: '#ef4444', display: 'block', marginTop: '4px' }}>
                ⚠️ {errors.password}
              </small>
            )}
            {touched.password && !errors.password && (
              <small style={{ color: '#10b981', display: 'block', marginTop: '4px' }}>
                ✔ Password meets minimum length requirements
              </small>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              width: '100%',
              padding: '12px',
              background: isFormValid ? '#2563eb' : '#94a3b8',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s'
            }}
          >
            {isFormValid ? 'Submit Registration' : 'Complete Form to Submit'}
          </button>
        </form>
      )}
    </div>
  );
}
