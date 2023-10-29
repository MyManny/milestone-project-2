import React, { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic here, e.g., make an API request to authenticate the user with the provided data.
    console.log('Login data:', formData);
    // Clear the form
    setFormData({
      username: '',
      password: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class='align'>
      <div>
        <label class='input'>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange} // Use the handleInputChange function
        />
      </div>
      <div>
        <label class='input'>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange} // Use the handleInputChange function
        />
      </div>
      </div>
      <button class="button-17" type="submit">Login</button>
    </form>
  );
}

export default LoginForm;

