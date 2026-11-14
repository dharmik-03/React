import { useSelector, useDispatch } from 'react-redux';
import {
  setActiveView,
  setSelectedCategory,
  openAddModal,
} from '../feature/InventorySlice';
import {
  IconDashboard,
  IconBox,
  IconAlertTriangle,
  IconPlus,
} from './Icons';

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const {
    products,
    activeView,
    selectedCategory,
  } = useSelector((state) => state.inventory);

  const lowStockCount = products.filter((p) => p.qty <= (p.minStock || 5)).length;
  const categories = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];

  const totalValue = products.reduce(
    (acc, p) => acc + (parseFloat(p.price) || 0) * (parseInt(p.qty, 10) || 0),
    0
  );

  const handleNavClick = (view) => {
    dispatch(setActiveView(view));
    if (onClose) onClose();
  };

  const handleCategoryClick = (cat) => {
    dispatch(setSelectedCategory(cat));
    dispatch(setActiveView('products'));
    if (onClose) onClose();
  };

  const handleAddClick = () => {
    dispatch(openAddModal());
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-action-wrap">
          <button type="button" className="sidebar-primary-btn" onClick={handleAddClick}>
            <IconPlus size={15} />
            <span>Add Product</span>
          </button>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">Navigation</div>
          <nav className="sidebar-nav">
            <button
              type="button"
              className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('dashboard')}
            >
              <IconDashboard size={16} />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeView === 'products' ? 'active' : ''}`}
              onClick={() => handleNavClick('products')}
            >
              <IconBox size={16} />
              <span>Products</span>
              <span className="nav-count">{products.length}</span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeView === 'low-stock' ? 'active' : ''}`}
              onClick={() => handleNavClick('low-stock')}
            >
              <IconAlertTriangle size={16} />
              <span>Low Stock</span>
              {lowStockCount > 0 && <span className="nav-count count-warn">{lowStockCount}</span>}
            </button>
          </nav>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">Categories</div>
          <div className="sidebar-category-list">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? products.length
                  : products.filter((p) => p.category === cat).length;
              const isSelected = selectedCategory === cat && activeView === 'products';
              return (
                <button
                  key={cat}
                  type="button"
                  className={`category-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  <span className="category-name">{cat}</span>
                  <span className="category-num">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-valuation-box">
            <span className="valuation-label">Warehouse Value</span>
            <span className="valuation-amount">
              ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
