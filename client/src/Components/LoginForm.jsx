import React, { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic here, e.g., make an API request to authenticate the user.
    // You can also use state management tools like Redux to handle user authentication.
    console.log('Login data:', formData);
    // Clear the form
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
