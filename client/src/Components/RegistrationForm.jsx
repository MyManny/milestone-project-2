import React, { useState } from 'react';

function RegistrationForm() {
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
    // Implement your registration logic here, e.g., make an API request to register the user with the provided data.
    console.log('Registration data:', formData);
    // Clear the form
    setFormData({
      username: '',
      password: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className='input'>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange} // Use the handleInputChange function
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange} // Use the handleInputChange function
        />
      </div>
      <button class="button-17" type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;

