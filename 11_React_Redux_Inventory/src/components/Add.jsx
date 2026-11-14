import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, handleEdit, closeAddModal } from '../feature/InventorySlice';
import { IconClose, IconPlus, IconCheck } from './Icons';

const CATEGORY_PRESETS = [
  'Electronics',
  'Furniture',
  'Accessories',
  'Office Supplies',
  'Clothing',
  'Home & Kitchen',
  'Health & Beauty',
  'Sports',
];

const ProductFormContent = ({ editVal }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(() => {
    if (editVal) {
      const isPreset = CATEGORY_PRESETS.includes(editVal.category);
      return {
        name: editVal.name || '',
        qty: editVal.qty !== undefined ? String(editVal.qty) : '',
        price: editVal.price !== undefined ? String(editVal.price) : '',
        category: isPreset ? editVal.category : 'Custom',
        customCategory: isPreset ? '' : editVal.category || '',
        sku: editVal.sku || '',
        minStock: editVal.minStock || 5,
      };
    }
    return {
      name: '',
      qty: '',
      price: '',
      category: 'Electronics',
      customCategory: '',
      sku: '',
      minStock: 5,
    };
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Product name is required.';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (form.price === '' || isNaN(form.price) || parseFloat(form.price) < 0) {
      newErrors.price = 'Please enter a valid price.';
    }

    if (form.qty === '' || isNaN(form.qty) || parseInt(form.qty, 10) < 0) {
      newErrors.qty = 'Quantity must be 0 or a positive whole number.';
    }

    if (form.category === 'Custom' && !form.customCategory.trim()) {
      newErrors.category = 'Please enter the custom category name.';
    }

    return newErrors;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (touched[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate();
    if (errs[field]) {
      setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({
        name: true,
        price: true,
        qty: true,
        category: true,
      });
      return;
    }

    const resolvedCategory =
      form.category === 'Custom' ? form.customCategory.trim() : form.category;

    const payload = {
      name: form.name.trim(),
      qty: parseInt(form.qty, 10),
      price: parseFloat(form.price),
      category: resolvedCategory,
      sku: form.sku.trim() || undefined,
      minStock: parseInt(form.minStock, 10) || 5,
    };

    if (editVal) {
      dispatch(handleEdit({ id: editVal.id, ...payload }));
    } else {
      dispatch(add(payload));
    }
  };

  const handleClose = () => {
    dispatch(closeAddModal());
  };

  const totalCalculated =
    (parseFloat(form.price) || 0) * (parseInt(form.qty, 10) || 0);

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-card form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-eyebrow">{editVal ? 'Update Product' : 'Catalog Entry'}</div>
            <h3 className="modal-title">{editVal ? 'Edit Product Details' : 'Add New Product'}</h3>
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

        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          <div className="form-body">
            {/* Product Name */}
            <div className="form-row col-span-2">
              <label htmlFor="prod-name" className="field-label">
                Product Name <span className="req-star">*</span>
              </label>
              <input
                id="prod-name"
                type="text"
                className={`text-input ${errors.name && touched.name ? 'input-invalid' : ''}`}
                placeholder="e.g. MacBook Pro 16-inch"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                autoFocus
              />
              {errors.name && touched.name && <span className="field-error">{errors.name}</span>}
            </div>

            {/* Category Select */}
            <div className="form-row">
              <label htmlFor="prod-category" className="field-label">
                Category <span className="req-star">*</span>
              </label>
              <div className="select-container">
                <select
                  id="prod-category"
                  className="select-input"
                  value={form.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  {CATEGORY_PRESETS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="Custom">+ Custom Category...</option>
                </select>
              </div>
            </div>

            {/* Custom Category Input if selected, or SKU */}
            {form.category === 'Custom' ? (
              <div className="form-row">
                <label htmlFor="custom-category" className="field-label">
                  Custom Category <span className="req-star">*</span>
                </label>
                <input
                  id="custom-category"
                  type="text"
                  className={`text-input ${errors.category && touched.category ? 'input-invalid' : ''}`}
                  placeholder="Enter category name"
                  value={form.customCategory}
                  onChange={(e) => handleChange('customCategory', e.target.value)}
                  onBlur={() => handleBlur('category')}
                />
                {errors.category && touched.category && (
                  <span className="field-error">{errors.category}</span>
                )}
              </div>
            ) : (
              <div className="form-row">
                <label htmlFor="prod-sku" className="field-label">
                  SKU Identifier <span className="hint-tag">(Optional)</span>
                </label>
                <input
                  id="prod-sku"
                  type="text"
                  className="text-input font-mono"
                  placeholder="e.g. TECH-MBP-16"
                  value={form.sku}
                  onChange={(e) => handleChange('sku', e.target.value)}
                />
              </div>
            )}

            {/* Unit Price */}
            <div className="form-row">
              <label htmlFor="prod-price" className="field-label">
                Price ($) <span className="req-star">*</span>
              </label>
              <input
                id="prod-price"
                type="number"
                step="0.01"
                min="0"
                className={`text-input font-mono ${errors.price && touched.price ? 'input-invalid' : ''}`}
                placeholder="0.00"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                onBlur={() => handleBlur('price')}
              />
              {errors.price && touched.price && <span className="field-error">{errors.price}</span>}
            </div>

            {/* Stock Quantity */}
            <div className="form-row">
              <label htmlFor="prod-qty" className="field-label">
                Initial Stock <span className="req-star">*</span>
              </label>
              <input
                id="prod-qty"
                type="number"
                min="0"
                step="1"
                className={`text-input font-mono ${errors.qty && touched.qty ? 'input-invalid' : ''}`}
                placeholder="0"
                value={form.qty}
                onChange={(e) => handleChange('qty', e.target.value)}
                onBlur={() => handleBlur('qty')}
              />
              {errors.qty && touched.qty && <span className="field-error">{errors.qty}</span>}
            </div>

            {/* Reorder Threshold */}
            <div className="form-row col-span-2">
              <label htmlFor="prod-min-stock" className="field-label">
                Reorder Threshold <span className="hint-tag">(Units)</span>
              </label>
              <input
                id="prod-min-stock"
                type="number"
                min="1"
                className="text-input font-mono"
                value={form.minStock}
                onChange={(e) => handleChange('minStock', e.target.value)}
              />
              <span className="field-desc">
                Triggers a "Low Stock" indicator when inventory drops to or below this amount.
              </span>
            </div>
          </div>

          {/* Form Valuation Preview Strip */}
          <div className="form-preview-strip">
            <span className="preview-label">Estimated Line Valuation:</span>
            <span className="preview-amount font-mono">
              ${totalCalculated.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editVal ? <IconCheck size={14} /> : <IconPlus size={14} />}
              <span>{editVal ? 'Save Changes' : 'Add to Inventory'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Add = () => {
  const { editVal, isAddModalOpen } = useSelector((state) => state.inventory);

  if (!isAddModalOpen) return null;

  return (
    <ProductFormContent
      editVal={editVal}
      key={editVal ? `edit-${editVal.id}` : 'new-product'}
    />
  );
};

export default Add;
