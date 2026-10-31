import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IconUsers, IconUserPlus } from './Icons';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  useEffect(() => {
    if (isOpen && onClose) {
      onClose();
    }
  }, [location.pathname, isOpen, onClose]);

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
        <NavLink to="/" className="sidebar-header">
          <h2 className="app-title-main">SMS</h2>
          <p className="app-subtitle-main">Student Management System</p>
        </NavLink>

        <div className="sidebar-nav">
          <p className="sidebar-nav-label">Menu</p>

          <NavLink
            to="/"
            end
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <IconUsers size={16} />
            <span>Students</span>
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <IconUserPlus size={16} />
            <span>Add Student</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
