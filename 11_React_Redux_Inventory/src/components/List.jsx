import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setEditVal,
  setDeleteCandidate,
  setViewProductModal,
  adjustStock,
  setSearchTerm,
  setSelectedCategory,
  setStockFilter,
  setSortBy,
  setCurrentPage,
  openAddModal,
} from '../feature/InventorySlice';
import {
  IconSearch,
  IconPlus,
  IconMinus,
  IconEye,
  IconEdit,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconBox,
  IconDownload,
} from './Icons';

const List = () => {
  const dispatch = useDispatch();
  const {
    products,
    searchTerm,
    selectedCategory,
    stockFilter,
    sortBy,
    currentPage,
    itemsPerPage,
  } = useSelector((state) => state.inventory);

  const categories = useMemo(() => {
    return ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        (item.sku && item.sku.toLowerCase().includes(term));

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const minStock = item.minStock || 5;
      let matchesStock = true;
      if (stockFilter === 'low') {
        matchesStock = item.qty > 0 && item.qty <= minStock;
      } else if (stockFilter === 'out') {
        matchesStock = item.qty === 0;
      } else if (stockFilter === 'in') {
        matchesStock = item.qty > minStock;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchTerm, selectedCategory, stockFilter]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    list.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
        case 'asc':
          return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
        case 'name-desc':
        case 'desc':
          return b.name.localeCompare(a.name, undefined, { sensitivity: 'base' });
        case 'price-asc':
        case 'Pasc':
          return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
        case 'price-desc':
        case 'Pdesc':
          return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
        case 'qty-asc':
        case 'qtyAsc':
          return (parseInt(a.qty, 10) || 0) - (parseInt(b.qty, 10) || 0);
        case 'qty-desc':
        case 'qtyDesc':
          return (parseInt(b.qty, 10) || 0) - (parseInt(a.qty, 10) || 0);
        default:
          return 0;
      }
    });
    return list;
  }, [filteredProducts, sortBy]);

  const totalItems = sortedProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (validCurrentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, validCurrentPage, itemsPerPage]);

  const startIndex = totalItems === 0 ? 0 : (validCurrentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(validCurrentPage * itemsPerPage, totalItems);

  const handleStockDelta = (id, delta, currentQty) => {
    if (delta < 0 && currentQty <= 0) return;
    dispatch(adjustStock({ id, delta }));
  };

  const handleClearFilters = () => {
    dispatch(setSearchTerm(''));
    dispatch(setSelectedCategory('All'));
    dispatch(setStockFilter('All'));
    dispatch(setSortBy('name-asc'));
  };

  

  const handleExportCSV = () => {
    if (sortedProducts.length === 0) return;
    const headers = ['ID', 'Name', 'Category', 'SKU', 'Price', 'Quantity', 'Valuation', 'Status'];
    const rows = sortedProducts.map((p) => {
      const isOut = p.qty === 0;
      const isLow = p.qty > 0 && p.qty <= (p.minStock || 5);
      const status = isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock';
      const val = ((parseFloat(p.price) || 0) * (parseInt(p.qty, 10) || 0)).toFixed(2);
      return [
        p.id,
        `"${p.name.replace(/"/g, '""')}"`,
        `"${p.category.replace(/"/g, '""')}"`,
        p.sku || '',
        parseFloat(p.price).toFixed(2),
        p.qty,
        val,
        status,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `stockwise_inventory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || stockFilter !== 'All';

  return (
    <div className="product-table-module">
      {/* Search and Filter Controls */}
      <div className="table-controls-bar">
        <div className="controls-left">
          <div className="inline-search">
            <IconSearch size={14} className="inline-search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
            {searchTerm && (
              <button
                type="button"
                className="inline-clear-btn"
                onClick={() => dispatch(setSearchTerm(''))}
              >
                &times;
              </button>
            )}
          </div>

          <div className="select-wrapper">
            <select
              value={selectedCategory}
              onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
              aria-label="Category filter"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <select
              value={stockFilter}
              onChange={(e) => dispatch(setStockFilter(e.target.value))}
              aria-label="Stock status filter"
            >
              <option value="All">All Statuses</option>
              <option value="in">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>

          <div className="select-wrapper">
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              aria-label="Sort order"
            >
              <option value="name-asc">Name &bull; A–Z</option>
              <option value="name-desc">Name &bull; Z–A</option>
              <option value="price-asc">Price &bull; Low to High</option>
              <option value="price-desc">Price &bull; High to Low</option>
              <option value="qty-asc">Stock &bull; Low to High</option>
              <option value="qty-desc">Stock &bull; High to Low</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="btn-filter-clear"
              onClick={handleClearFilters}
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="controls-right">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleExportCSV}
            disabled={sortedProducts.length === 0}
            title="Export to CSV spreadsheet"
          >
            <IconDownload size={14} />
            <span>Export</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={() => dispatch(openAddModal())}
          >
            <IconPlus size={14} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Elegant Data Table */}
      <div className="table-container">
        {paginatedProducts.length === 0 ? (
          <div className="table-empty-state">
            <div className="empty-icon-wrap">
              <IconBox size={32} />
            </div>
            <h4 className="empty-title">No products found</h4>
            <p className="empty-subtitle">
              {hasActiveFilters
                ? 'No inventory items match the current search or filters.'
                : 'There are currently no products in the catalog.'}
            </p>
            {hasActiveFilters ? (
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={handleClearFilters}
              >
                Reset filters
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary btn-sm"
                onClick={() => dispatch(openAddModal())}
              >
                <IconPlus size={14} /> Add Product
              </button>
            )}
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '38%' }}>Product</th>
                <th style={{ width: '16%' }}>Price</th>
                <th style={{ width: '18%' }}>Stock Level</th>
                <th style={{ width: '16%' }}>Status</th>
                <th style={{ width: '12%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p) => {
                const isOut = p.qty === 0;
                const isLow = p.qty > 0 && p.qty <= (p.minStock || 5);
                const totalWorth = (parseFloat(p.price) || 0) * (parseInt(p.qty, 10) || 0);

                return (
                  <tr key={p.id} className="data-row">
                    <td>
                      <div className="product-cell">
                        <span className="product-title">{p.name}</span>
                        <div className="product-meta">
                          <span className="meta-sku">{p.sku || 'NO-SKU'}</span>
                          <span className="meta-sep">&bull;</span>
                          <span className="meta-cat">{p.category}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="price-cell">
                        <span className="price-val font-mono">${parseFloat(p.price).toFixed(2)}</span>
                        <span className="price-total font-mono">
                          Total: ${totalWorth.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="stock-stepper">
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => handleStockDelta(p.id, -1, p.qty)}
                          disabled={p.qty <= 0}
                          aria-label="Decrease quantity"
                        >
                          <IconMinus size={11} />
                        </button>
                        <span className="stepper-val font-mono">{p.qty}</span>
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => handleStockDelta(p.id, 1, p.qty)}
                          aria-label="Increase quantity"
                        >
                          <IconPlus size={11} />
                        </button>
                      </div>
                    </td>

                    <td>
                      {isOut ? (
                        <span className="status-pill status-pill-danger">
                          <span className="dot dot-danger"></span>
                          Out of stock
                        </span>
                      ) : isLow ? (
                        <span className="status-pill status-pill-warning">
                          <span className="dot dot-warning"></span>
                          Low stock ({p.qty})
                        </span>
                      ) : (
                        <span className="status-pill status-pill-success">
                          <span className="dot dot-success"></span>
                          In stock
                        </span>
                      )}
                    </td>

                    <td>
                      <div className="row-actions">
                        <button
                          type="button"
                          className="row-action-btn"
                          onClick={() => dispatch(setViewProductModal(p))}
                          title="View details"
                          aria-label={`View ${p.name}`}
                        >
                          <IconEye size={14} />
                        </button>

                        <button
                          type="button"
                          className="row-action-btn"
                          onClick={() => dispatch(setEditVal(p.id))}
                          title="Edit"
                          aria-label={`Edit ${p.name}`}
                        >
                          <IconEdit size={14} />
                        </button>

                        <button
                          type="button"
                          className="row-action-btn btn-trash"
                          onClick={() => dispatch(setDeleteCandidate(p))}
                          title="Delete"
                          aria-label={`Delete ${p.name}`}
                        >
                          <IconTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Minimal Footer Pagination */}
        {totalItems > 0 && (
          <div className="table-footer">
            <span className="footer-range">
              Showing <strong>{startIndex}–{endIndex}</strong> of <strong>{totalItems}</strong> items
            </span>

            <div className="footer-pagination">
              <button
                type="button"
                className="btn-pagination-nav"
                onClick={() => dispatch(setCurrentPage(validCurrentPage - 1))}
                disabled={validCurrentPage <= 1}
              >
                <IconChevronLeft size={14} />
                <span>Prev</span>
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`btn-page-number ${validCurrentPage === num ? 'active' : ''}`}
                    onClick={() => dispatch(setCurrentPage(num))}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="btn-pagination-nav"
                onClick={() => dispatch(setCurrentPage(validCurrentPage + 1))}
                disabled={validCurrentPage >= totalPages}
              >
                <span>Next</span>
                <IconChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
