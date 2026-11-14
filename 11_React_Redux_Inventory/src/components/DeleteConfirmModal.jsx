import { useDispatch } from 'react-redux';
import { deleteP, setDeleteCandidate } from '../feature/InventorySlice';
import { IconAlertTriangle, IconTrash } from './Icons';

const DeleteConfirmModal = ({ product }) => {
  const dispatch = useDispatch();

  if (!product) return null;

  const handleClose = () => {
    dispatch(setDeleteCandidate(null));
  };

  const handleConfirm = () => {
    dispatch(deleteP(product.id));
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-card confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon-wrap">
          <IconAlertTriangle size={24} />
        </div>

        <h3 className="confirm-title">Remove product from catalog?</h3>
        <p className="confirm-desc">
          Are you sure you want to permanently delete <strong>"{product.name}"</strong>? This will remove all <strong>{product.qty} units</strong> from warehouse tracking. This action cannot be reversed.
        </p>

        <div className="confirm-actions">
          <button type="button" className="btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button type="button" className="btn-danger" onClick={handleConfirm}>
            <IconTrash size={14} />
            <span>Delete Product</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
