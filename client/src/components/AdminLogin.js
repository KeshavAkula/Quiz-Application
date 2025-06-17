// src/components/AdminLogin.js
import React, { useState } from 'react';
import AdminForm from './AdminForm';
import '../styles/AdminLogin.css'

export default function AdminLogin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded check
    if (form.username === 'admin' && form.password === 'admin123') {
      setAuthenticated(true);
    } else {
      alert('Invalid credentials!');
    }
  };

  if (authenticated) {
    return <AdminForm />;
  }

  return (
    <div className="admin-login-container">
      <form onSubmit={handleLogin} className="admin-login-form">
        <h2>Admin Login</h2>
        <label>Username:</label>
        <input type="text" name="username" value={form.username} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
