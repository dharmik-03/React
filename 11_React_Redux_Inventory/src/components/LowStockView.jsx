import { useSelector, useDispatch } from 'react-redux';
import {
  adjustStock,
  setEditVal,
  setViewProductModal,
  setActiveView,
  setStockFilter,
} from '../feature/InventorySlice';
import {
  IconPlus,
  IconEye,
  IconEdit,
  IconBox,
} from './Icons';

const LowStockView = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.inventory.products);

  const lowStockItems = products.filter(
    (p) => p.qty <= (p.minStock || 5)
  );

  const handleRestock = (id, delta) => {
    dispatch(adjustStock({ id, delta }));
  };

  return (
    <div className="replenishment-module">
      <div className="replenish-header-bar">
        <div>
          <h2 className="view-title">Inventory Replenishment</h2>
          <p className="view-subtitle">
            <strong>{lowStockItems.length} items</strong> have reached or fallen below their minimum safety thresholds.
          </p>
        </div>
        <button
          type="button"
          className="btn-secondary btn-sm"
          onClick={() => {
            dispatch(setStockFilter('All'));
            dispatch(setActiveView('products'));
          }}
        >
          View all catalog products
        </button>
      </div>

      <div className="table-container">
        {lowStockItems.length === 0 ? (
          <div className="table-empty-state">
            <div className="empty-icon-wrap">
              <IconBox size={32} />
            </div>
            <h4 className="empty-title">All stock levels are optimal</h4>
            <p className="empty-subtitle">
              No products are currently under their replenishment thresholds.
            </p>
            <button
              type="button"
              className="btn-primary btn-sm"
              onClick={() => {
                dispatch(setStockFilter('All'));
                dispatch(setActiveView('products'));
              }}
            >
              Browse catalog
            </button>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '32%' }}>Product</th>
                <th style={{ width: '14%' }}>Current Stock</th>
                <th style={{ width: '14%' }}>Threshold</th>
                <th style={{ width: '14%' }}>Deficit</th>
                <th style={{ width: '16%' }}>Quick Restock</th>
                <th style={{ width: '10%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item) => {
                const isOut = item.qty === 0;
                const threshold = item.minStock || 5;
                const deficit = Math.max(0, threshold - item.qty);

                return (
                  <tr key={item.id} className="data-row">
                    <td>
                      <div className="product-cell">
                        <span className="product-title">{item.name}</span>
                        <div className="product-meta">
                          <span className="meta-sku">{item.sku || 'NO-SKU'}</span>
                          <span className="meta-sep">&bull;</span>
                          <span className="meta-cat">{item.category}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`status-pill ${isOut ? 'status-pill-danger' : 'status-pill-warning'}`}>
                        <span className={`dot ${isOut ? 'dot-danger' : 'dot-warning'}`}></span>
                        {item.qty} units
                      </span>
                    </td>

                    <td className="font-mono text-muted">&le; {threshold}</td>

                    <td>
                      <span className="deficit-badge">
                        {deficit === 0 ? 'At minimum' : `-${deficit} units`}
                      </span>
                    </td>

                    <td>
                      <div className="restock-btn-group">
                        <button
                          type="button"
                          className="btn-restock"
                          onClick={() => handleRestock(item.id, 5)}
                          title="Restock 5 units"
                        >
                          <IconPlus size={10} /> 5
                        </button>
                        <button
                          type="button"
                          className="btn-restock"
                          onClick={() => handleRestock(item.id, 10)}
                          title="Restock 10 units"
                        >
                          <IconPlus size={10} /> 10
                        </button>
                        <button
                          type="button"
                          className="btn-restock"
                          onClick={() => handleRestock(item.id, 25)}
                          title="Restock 25 units"
                        >
                          <IconPlus size={10} /> 25
                        </button>
                      </div>
                    </td>

                    <td>
                      <div className="row-actions">
                        <button
                          type="button"
                          className="row-action-btn"
                          onClick={() => dispatch(setViewProductModal(item))}
                          title="Inspect product"
                        >
                          <IconEye size={14} />
                        </button>
                        <button
                          type="button"
                          className="row-action-btn"
                          onClick={() => dispatch(setEditVal(item.id))}
                          title="Edit"
                        >
                          <IconEdit size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LowStockView;
