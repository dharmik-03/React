import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <div className="nav-links">
          <NavLink
            to="/blogs"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Blogs
          </NavLink>
          <NavLink
            to="/create-blog"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Create Blog
          </NavLink>
        </div>
        <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
