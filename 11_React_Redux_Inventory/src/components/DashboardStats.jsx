import { useSelector, useDispatch } from 'react-redux';
import {
  setActiveView,
  setStockFilter,
  setSelectedCategory,
} from '../feature/InventorySlice';


const DashboardStats = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.inventory.products);

  const totalProducts = products.length;
  const totalUnits = products.reduce((acc, p) => acc + (parseInt(p.qty, 10) || 0), 0);
  const totalValue = products.reduce(
    (acc, p) => acc + (parseFloat(p.price) || 0) * (parseInt(p.qty, 10) || 0),
    0
  );
  const lowStockProducts = products.filter(
    (p) => p.qty > 0 && p.qty <= (p.minStock || 5)
  );
  const outOfStockProducts = products.filter((p) => p.qty === 0);
  const healthyCount = products.filter((p) => p.qty > (p.minStock || 5)).length;

  const categoryMap = products.reduce((acc, p) => {
    const cat = p.category || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const handleStatClick = (view, filter = 'All') => {
    dispatch(setActiveView(view));
    dispatch(setStockFilter(filter));
  };

  const handleCategoryFilter = (cat) => {
    dispatch(setSelectedCategory(cat));
    dispatch(setActiveView('products'));
  };

  return (
    <div className="dashboard-metrics-container">
      <div className="stats-row">
        <div
          className="stat-tile"
          onClick={() => handleStatClick('products', 'All')}
        >
          <span className="stat-label">Total Inventory Value</span>
          <div className="stat-num">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="stat-hint">Across all warehouse stock</span>
        </div>

        <div
          className="stat-tile"
          onClick={() => handleStatClick('products', 'All')}
        >
          <span className="stat-label">Total Products</span>
          <div className="stat-num">{totalProducts}</div>
          <span className="stat-hint">Active catalog SKUs</span>
        </div>

        <div
          className="stat-tile"
          onClick={() => handleStatClick('products', 'All')}
        >
          <span className="stat-label">Total Units in Stock</span>
          <div className="stat-num">{totalUnits.toLocaleString()}</div>
          <span className="stat-hint">Physical inventory count</span>
        </div>

        <div
          className={`stat-tile ${lowStockProducts.length + outOfStockProducts.length > 0 ? 'stat-has-alert' : ''}`}
          onClick={() => handleStatClick('low-stock', 'low')}
        >
          <div className="stat-label-wrap">
            <span className="stat-label">Low Stock Alerts</span>
            {lowStockProducts.length + outOfStockProducts.length > 0 && (
              <span className="stat-badge-warn">Needs Attention</span>
            )}
          </div>
          <div className="stat-num">
            {lowStockProducts.length + outOfStockProducts.length}
          </div>
          <span className="stat-hint">
            {outOfStockProducts.length} out of stock &bull; {lowStockProducts.length} below threshold
          </span>
        </div>
      </div>

      <div className="overview-strip">
        <div className="overview-section">
          <span className="overview-title">Inventory Health</span>
          <div className="health-pills">
            <button
              type="button"
              className="health-pill pill-healthy"
              onClick={() => handleStatClick('products', 'in')}
            >
              <span className="dot dot-success"></span>
              <span className="pill-text">Healthy</span>
              <span className="pill-val">{healthyCount}</span>
            </button>

            <button
              type="button"
              className="health-pill pill-warning"
              onClick={() => handleStatClick('low-stock', 'low')}
            >
              <span className="dot dot-warning"></span>
              <span className="pill-text">Low stock</span>
              <span className="pill-val">{lowStockProducts.length}</span>
            </button>

            <button
              type="button"
              className="health-pill pill-danger"
              onClick={() => handleStatClick('products', 'out')}
            >
              <span className="dot dot-danger"></span>
              <span className="pill-text">Out of stock</span>
              <span className="pill-val">{outOfStockProducts.length}</span>
            </button>
          </div>
        </div>

        <div className="overview-section">
          <span className="overview-title">Category Breakdown</span>
          <div className="category-tags-row">
            {Object.entries(categoryMap).map(([cat, count]) => (
              <button
                key={cat}
                type="button"
                className="category-filter-tag"
                onClick={() => handleCategoryFilter(cat)}
              >
                <span className="tag-name">{cat}</span>
                <span className="tag-count">{count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
