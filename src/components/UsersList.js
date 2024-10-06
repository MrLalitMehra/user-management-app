import React from 'react';
import { Link } from 'react-router-dom';

const UsersList = ({ users, isLoading, setUsers }) => {
  const deleteUser = async (id) => {
    const previousUsers = [...users]; // Make a copy of the users array
    setUsers(users.filter(user => user.id !== id)); // Optimistically update UI

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete user');
      } catch (error) {
        console.error('Error deleting user:', error);
        setUsers(previousUsers); // Rollback if error occurs
      }
    } else {
      setUsers(previousUsers); // Rollback if user cancels
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1 className="mb-4 text-danger">List Of Users</h1>
        {isLoading ? (
          <p>Loading users...</p>
        ) : (
          <table className="table table-striped table-hover shadow-sm">
            <thead className="bg-dark text-white">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link className="btn btn-sm btn-primary m-1" to={`/users/${user.id}`}>
                      View
                    </Link>
                    <Link className="btn btn-sm btn-warning m-1" to={`/users/edit/${user.id}`}>
                      Edit
                    </Link>
                    <button className="btn btn-sm btn-danger m-1" onClick={() => deleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UsersList;
