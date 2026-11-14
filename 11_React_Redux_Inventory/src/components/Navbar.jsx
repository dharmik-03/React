import { useSelector, useDispatch } from 'react-redux';
import {
  setSearchTerm,
  setActiveView,
  resetToDefaultData,
} from '../feature/InventorySlice';
import {
  IconLogo,
  IconSearch,
  IconSun,
  IconMoon,
  IconRefresh,
  IconMenu,
} from './Icons';

const Navbar = ({ isDark, onToggleTheme, onToggleSidebar }) => {
  const dispatch = useDispatch();
  const { products, searchTerm } = useSelector((state) => state.inventory);

  const lowStockCount = products.filter((p) => p.qty <= (p.minStock || 5)).length;

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="topbar-menu-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <IconMenu size={18} />
        </button>

        <div className="topbar-brand" onClick={() => dispatch(setActiveView('dashboard'))}>
          <div className="topbar-logo">
            <IconLogo size={18} />
          </div>
          <span className="brand-name">Stockwise</span>
          <span className="brand-version">v1.0</span>
        </div>
      </div>

      <div className="topbar-center">
        <div className="search-field">
          <IconSearch size={15} className="search-field-icon" />
          <input
            type="text"
            placeholder="Search products, SKU, or category..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm ? (
            <button
              type="button"
              className="search-field-clear"
              onClick={() => dispatch(setSearchTerm(''))}
              aria-label="Clear search"
            >
              &times;
            </button>
          ) : (
            <kbd className="search-shortcut">/</kbd>
          )}
        </div>
      </div>

      <div className="topbar-right">
        {lowStockCount > 0 && (
          <button
            type="button"
            className="topbar-alert-btn"
            onClick={() => dispatch(setActiveView('low-stock'))}
            title={`${lowStockCount} items need replenishment`}
          >
            <span className="alert-dot"></span>
            <span className="alert-text">{lowStockCount} low stock</span>
          </button>
        )}

        <button
          type="button"
          className="topbar-icon-btn"
          onClick={onToggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label="Toggle theme"
        >
          {isDark ? <IconSun size={16} /> : <IconMoon size={16} />}
        </button>

        <button
          type="button"
          className="topbar-reset-btn"
          onClick={() => {
            if (window.confirm('Reset catalog to sample demo data?')) {
              dispatch(resetToDefaultData());
            }
          }}
          title="Reset to default demo products"
        >
          <IconRefresh size={14} />
          <span>Reset</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
