import { useDispatch } from 'react-redux';
import {
  setViewProductModal,
  setEditVal,
  adjustStock,
} from '../feature/InventorySlice';
import {
  IconClose,
  IconEdit,
  IconPlus,
  IconMinus,
} from './Icons';

const ProductDetailModal = ({ product }) => {
  const dispatch = useDispatch();

  if (!product) return null;

  const handleClose = () => {
    dispatch(setViewProductModal(null));
  };

  const handleEdit = () => {
    dispatch(setViewProductModal(null));
    dispatch(setEditVal(product.id));
  };

  const handleStockChange = (delta) => {
    dispatch(adjustStock({ id: product.id, delta }));
  };

  const totalValue = (parseFloat(product.price) || 0) * (parseInt(product.qty, 10) || 0);
  const isOutOfStock = product.qty === 0;
  const isLowStock = product.qty > 0 && product.qty <= (product.minStock || 5);

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-card detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-eyebrow">{product.category}</div>
            <h3 className="modal-title">{product.name}</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close dialog"
          >
            <IconClose size={16} />
          </button>
        </div>

        <div className="modal-body">
          {/* Status strip */}
          <div className="detail-status-row">
            <div className="status-label-group">
              <span className="detail-prop-label">Stock Status</span>
              {isOutOfStock ? (
                <span className="status-pill status-pill-danger">
                  <span className="dot dot-danger"></span> Depleted (0 units)
                </span>
              ) : isLowStock ? (
                <span className="status-pill status-pill-warning">
                  <span className="dot dot-warning"></span> Low stock ({product.qty} units)
                </span>
              ) : (
                <span className="status-pill status-pill-success">
                  <span className="dot dot-success"></span> In stock ({product.qty} units)
                </span>
              )}
            </div>
            <div className="detail-prop-group">
              <span className="detail-prop-label">SKU Identifier</span>
              <span className="detail-prop-val font-mono">{product.sku || 'N/A'}</span>
            </div>
          </div>

          <div className="detail-spec-grid">
            <div className="spec-card">
              <span className="spec-label">Unit Price</span>
              <span className="spec-val font-mono">${parseFloat(product.price).toFixed(2)}</span>
            </div>

            <div className="spec-card">
              <span className="spec-label">Current Stock</span>
              <span className="spec-val font-mono">{product.qty} units</span>
            </div>

            <div className="spec-card">
              <span className="spec-label">Total Inventory Worth</span>
              <span className="spec-val font-mono">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            <div className="spec-card">
              <span className="spec-label">Reorder Level</span>
              <span className="spec-val font-mono">&le; {product.minStock || 5} units</span>
            </div>
          </div>

          {/* Quick Adjust Strip */}
          <div className="detail-adjust-strip">
            <span className="adjust-strip-title">Adjust stock on hand:</span>
            <div className="adjust-strip-buttons">
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={() => handleStockChange(-1)}
                disabled={product.qty <= 0}
              >
                <IconMinus size={12} /> 1
              </button>
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={() => handleStockChange(1)}
              >
                <IconPlus size={12} /> 1
              </button>
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={() => handleStockChange(10)}
              >
                <IconPlus size={12} /> 10
              </button>
            </div>
          </div>

          <div className="detail-footer-meta">
            <span>Created: {product.createdAt || 'N/A'}</span>
            {product.updatedAt && <span>Modified: {product.updatedAt}</span>}
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={handleClose}>
            Done
          </button>
          <button type="button" className="btn-primary" onClick={handleEdit}>
            <IconEdit size={14} />
            <span>Edit Product</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
