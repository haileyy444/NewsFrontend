import React, { useState } from 'react';
import './Login.css';  

function LoginForm({handleSubmit}) {
  // State to hold form data
  const [formData, setFormData] = useState({
    username: '',
    password: ''
    
  });

  // State to handle form submission
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };



  return (
    <div className='login'>
    <h1>Welcome to the NewsStand</h1>
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData, setError);
      }}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
    </div>
  );
}

export default LoginForm;
