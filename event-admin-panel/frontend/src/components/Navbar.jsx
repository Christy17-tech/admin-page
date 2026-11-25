import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">EventAdmin</div>
        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-tab active' : 'nav-tab')}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/add-event"
            className={({ isActive }) => (isActive ? 'nav-tab active' : 'nav-tab')}
          >
            Add Event
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;