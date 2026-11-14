import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import RecentActivity from './components/RecentActivity';
import List from './components/List';
import Add from './components/Add';
import LowStockView from './components/LowStockView';
import ProductDetailModal from './components/ProductDetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { setActiveView, openAddModal } from './feature/InventorySlice';
import { IconBox, IconPlus } from './components/Icons';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const {
    activeView,
    viewProductModal,
    deleteCandidate,
  } = useSelector((state) => state.inventory);

  // Theme state persisted in localStorage
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('inventory_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Mobile sidebar open state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('inventory_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('inventory_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={`app-shell ${isDark ? 'theme-dark' : 'theme-light'}`}>
      {/* Sleek Topbar Navigation */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onToggleSidebar={toggleSidebar}
      />

      <div className="app-layout">
        {/* Minimal Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Primary Content View */}
        <main className="content-area">
          {activeView === 'dashboard' && (
            <div className="view-dashboard">
              {/* Dashboard Header */}
              <div className="view-header">
                <div>
                  <h1 className="view-title">Inventory Overview</h1>
                  <p className="view-subtitle">
                    Real-time stock levels, catalog metrics, and warehouse valuation.
                  </p>
                </div>
                <div className="view-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => dispatch(setActiveView('products'))}
                  >
                    <IconBox size={15} />
                    <span>View All Products</span>
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => dispatch(openAddModal())}
                  >
                    <IconPlus size={15} />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {/* Integrated Metrics Strip & Health Breakdown */}
              <DashboardStats />

              {/* Activity Trail & Catalog Preview */}
              <div className="dashboard-grid">
                <RecentActivity />

                <div className="dashboard-catalog-panel">
                  <div className="panel-header">
                    <div>
                      <h3 className="panel-title">Active Catalog</h3>
                      <span className="panel-meta">Quick access to warehouse products</span>
                    </div>
                    <button
                      type="button"
                      className="panel-link-btn"
                      onClick={() => dispatch(setActiveView('products'))}
                    >
                      Open full catalog &rarr;
                    </button>
                  </div>
                  <List />
                </div>
              </div>
            </div>
          )}

          {activeView === 'products' && (
            <div className="view-products">
              <div className="view-header">
                <div>
                  <h1 className="view-title">Product Catalog</h1>
                  <p className="view-subtitle">
                    Manage SKUs, update stock quantities, filter by category, and export records.
                  </p>
                </div>
              </div>
              <List />
            </div>
          )}

          {activeView === 'low-stock' && (
            <div className="view-low-stock">
              <LowStockView />
            </div>
          )}
        </main>
      </div>

      {/* Modals & Dialogs */}
      <Add />
      {viewProductModal && <ProductDetailModal product={viewProductModal} />}
      {deleteCandidate && <DeleteConfirmModal product={deleteCandidate} />}

      {/* Subtle Toast Feedback */}
      <Toast />
    </div>
  );
};

export default App;
