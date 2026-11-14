import { createSlice } from "@reduxjs/toolkit";

const getInitialProducts = () => {
  const saved = localStorage.getItem("inventory_products_v2");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // fallback to initial
    }
  }
  return [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      qty: 12,
      price: 2499,
      category: "Electronics",
      sku: "TECH-MBP-01",
      minStock: 5,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    },
    {
      id: 2,
      name: "Sony WH-1000XM5 Headphones",
      qty: 4,
      price: 399,
      category: "Electronics",
      sku: "AUDIO-SNY-02",
      minStock: 5,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    },
    {
      id: 3,
      name: "Ergonomic Mesh Chair",
      qty: 18,
      price: 289,
      category: "Furniture",
      sku: "FURN-CHR-03",
      minStock: 5,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    },
    {
      id: 4,
      name: '34" Curved Gaming Monitor',
      qty: 3,
      price: 649,
      category: "Electronics",
      sku: "DISP-CRV-04",
      minStock: 5,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    },
    {
      id: 5,
      name: "Motorized Standing Desk",
      qty: 7,
      price: 520,
      category: "Furniture",
      sku: "FURN-DSK-05",
      minStock: 5,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    },
    {
      id: 6,
      name: "Wireless Mechanical Keyboard",
      qty: 24,
      price: 139,
      category: "Accessories",
      sku: "PERI-KBD-06",
      minStock: 5,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    },
    {
      id: 7,
      name: "Precision Ergonomic Mouse",
      qty: 0,
      price: 89,
      category: "Accessories",
      sku: "PERI-MSE-07",
      minStock: 5,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    },
    {
      id: 8,
      name: "USB-C Dual 4K Docking Station",
      qty: 15,
      price: 179,
      category: "Accessories",
      sku: "TECH-DOC-08",
      minStock: 5,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    },
  ];
};

const getInitialActivities = () => {
  return [
    {
      id: 1,
      type: "create",
      text: "System initialized with initial product catalog",
      time: "Just now",
      timestamp: Date.now(),
    },
  ];
};

const persistProducts = (products) => {
  try {
    localStorage.setItem("inventory_products_v2", JSON.stringify(products));
  } catch (err) {
    console.warn("Failed to persist products to localStorage", err);
  }
};

const initialState = {
  products: getInitialProducts(),
  editVal: null,
  activities: getInitialActivities(),
  selectedCategory: "All",
  stockFilter: "All", // "All", "low", "out", "in"
  searchTerm: "",
  sortBy: "name-asc", // "name-asc", "name-desc", "price-asc", "price-desc", "qty-asc", "qty-desc"
  currentPage: 1,
  itemsPerPage: 6,
  activeView: "dashboard", // "dashboard", "products", "low-stock"
  viewProductModal: null, // product object or null
  isAddModalOpen: false,
  deleteCandidate: null, // product to confirm delete or null
  notification: null, // { message, type: 'success' | 'info' | 'error' }
};

const InventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    add: (state, action) => {
      const payload = action.payload;
      const newProduct = {
        id: Date.now(),
        name: payload.name.trim(),
        qty: Math.max(0, parseInt(payload.qty, 10) || 0),
        price: Math.max(0, parseFloat(payload.price) || 0),
        category: payload.category.trim() || "General",
        sku: payload.sku?.trim() || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        minStock: parseInt(payload.minStock, 10) || 5,
        createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      };

      state.products.unshift(newProduct);
      state.isAddModalOpen = false;
      state.activities.unshift({
        id: Date.now(),
        type: "create",
        text: `Added new product "${newProduct.name}" (${newProduct.category})`,
        time: "Just now",
        timestamp: Date.now(),
      });
      state.notification = {
        message: `Product "${newProduct.name}" added successfully!`,
        type: "success",
      };
      persistProducts(state.products);
    },

    deleteP: (state, action) => {
      const id = action.payload;
      const target = state.products.find((p) => p.id === id);
      if (target) {
        state.products = state.products.filter((p) => p.id !== id);
        if (state.editVal?.id === id) {
          state.editVal = null;
          state.isAddModalOpen = false;
        }
        if (state.viewProductModal?.id === id) {
          state.viewProductModal = null;
        }
        state.deleteCandidate = null;
        state.activities.unshift({
          id: Date.now(),
          type: "delete",
          text: `Deleted product "${target.name}" from inventory`,
          time: "Just now",
          timestamp: Date.now(),
        });
        state.notification = {
          message: `Product "${target.name}" deleted.`,
          type: "error",
        };
        persistProducts(state.products);
      }
    },

    setEditVal: (state, action) => {
      const id = action.payload;
      const found = state.products.find((l) => l.id === id);
      if (found) {
        state.editVal = { ...found };
        state.isAddModalOpen = true;
      }
    },

    clearEditVal: (state) => {
      state.editVal = null;
      state.isAddModalOpen = false;
    },

    openAddModal: (state) => {
      state.editVal = null;
      state.isAddModalOpen = true;
    },

    closeAddModal: (state) => {
      state.editVal = null;
      state.isAddModalOpen = false;
    },

    handleEdit: (state, action) => {
      const payload = action.payload;
      const targetId = state.editVal ? state.editVal.id : payload.id;
      const index = state.products.findIndex((l) => l.id === targetId);

      if (index !== -1) {
        const oldProduct = state.products[index];
        const updated = {
          ...oldProduct,
          name: payload.name.trim(),
          qty: Math.max(0, parseInt(payload.qty, 10) || 0),
          price: Math.max(0, parseFloat(payload.price) || 0),
          category: payload.category.trim() || oldProduct.category,
          sku: payload.sku?.trim() || oldProduct.sku,
          minStock: parseInt(payload.minStock, 10) || oldProduct.minStock || 5,
          updatedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        };

        state.products[index] = updated;
        state.activities.unshift({
          id: Date.now(),
          type: "update",
          text: `Updated details for "${updated.name}"`,
          time: "Just now",
          timestamp: Date.now(),
        });
        state.notification = {
          message: `Product "${updated.name}" updated successfully!`,
          type: "success",
        };
        persistProducts(state.products);
      }

      state.editVal = null;
      state.isAddModalOpen = false;
    },

    adjustStock: (state, action) => {
      const { id, delta } = action.payload;
      const target = state.products.find((p) => p.id === id);
      if (target) {
        const newQty = Math.max(0, target.qty + delta);
        const diff = newQty - target.qty;
        target.qty = newQty;

        if (diff !== 0) {
          state.activities.unshift({
            id: Date.now(),
            type: diff > 0 ? "stock-in" : "stock-out",
            text: `${diff > 0 ? "Increased" : "Decreased"} stock for "${target.name}" by ${Math.abs(diff)} (now ${newQty})`,
            time: "Just now",
            timestamp: Date.now(),
          });
          state.notification = {
            message: `Updated ${target.name} stock to ${newQty} units`,
            type: "info",
          };
          persistProducts(state.products);
        }
      }
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },

    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },

    setStockFilter: (state, action) => {
      state.stockFilter = action.payload;
      state.currentPage = 1;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setActiveView: (state, action) => {
      state.activeView = action.payload;
      state.currentPage = 1;
      if (action.payload === "low-stock") {
        state.stockFilter = "low";
      } else if (action.payload === "products" && state.stockFilter === "low") {
        state.stockFilter = "All";
      }
    },

    setViewProductModal: (state, action) => {
      state.viewProductModal = action.payload;
    },

    setDeleteCandidate: (state, action) => {
      state.deleteCandidate = action.payload;
    },

    clearNotification: (state) => {
      state.notification = null;
    },

    setNotification: (state, action) => {
      state.notification = action.payload;
    },

    resetToDefaultData: (state) => {
      localStorage.removeItem("inventory_products_v2");
      state.products = getInitialProducts();
      state.activities = getInitialActivities();
      state.selectedCategory = "All";
      state.stockFilter = "All";
      state.searchTerm = "";
      state.sortBy = "name-asc";
      state.currentPage = 1;
      state.notification = {
        message: "Inventory reset to default sample data",
        type: "info",
      };
    },
  },
});

export const {
  add,
  deleteP,
  setEditVal,
  clearEditVal,
  openAddModal,
  closeAddModal,
  handleEdit,
  adjustStock,
  setSearchTerm,
  setSelectedCategory,
  setStockFilter,
  setSortBy,
  setCurrentPage,
  setActiveView,
  setViewProductModal,
  setDeleteCandidate,
  clearNotification,
  setNotification,
  resetToDefaultData,
} = InventorySlice.actions;

export default InventorySlice.reducer;
