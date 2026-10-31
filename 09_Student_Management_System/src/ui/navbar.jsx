import { Link, useLocation } from 'react-router-dom';
import { IconMenu, IconSun, IconMoon, IconPlus } from './Icons';
import { useTheme } from '../context/useTheme';

const Navbar = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname === '/') return 'Students Directory';
    if (location.pathname === '/add') return 'Add Student';
    if (location.pathname.startsWith('/edit/')) return 'Edit Student';
    if (location.pathname.startsWith('/student/')) return 'Student Details';
    return 'Dashboard';
  };

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <IconMenu size={18} />
        </button>

        <h1 className="navbar-page-title">{getPageTitle()}</h1>
      </div>

      <div className="navbar-right">
        {location.pathname !== '/add' && (
          <Link to="/add" className="btn-sms-primary">
            <IconPlus size={16} />
            <span>Add Student</span>
          </Link>
        )}

        <button
          type="button"
          className="theme-switch-btn"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          <span className="theme-switch-icon-wrapper">
            {theme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
          </span>
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
