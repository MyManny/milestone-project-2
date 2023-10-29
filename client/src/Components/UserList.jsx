import React, { useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([
    // You can populate this array with user data from your back end.
    { id: 1, username: 'user1', email: 'user1@example.com' },
    { id: 2, username: 'user2', email: 'user2@example.com' },
  ]);

  const handleDeleteUser = (userId) => {
    // Implement user deletion logic here, e.g., make an API request to delete the user.
    // You can also use state management tools like Redux to update the user list.
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>Username: {user.username}</span>
            <span>Email: {user.email}</span>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
