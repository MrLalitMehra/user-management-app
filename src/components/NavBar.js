import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">User Management</Link>
      <div className="collapse navbar-collapse">
        <Link className="btn btn-primary ml-auto" to="/users/add">Add User</Link>
      </div>
    </nav>
  );
};

export default NavBar;
