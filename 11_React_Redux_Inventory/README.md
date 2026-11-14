# Stockwise — Inventory Management

A minimal, modern, and practical Inventory Management application built with **React 19, Redux Toolkit, JavaScript, and Vite**.

Designed with a clean, understated SaaS aesthetic (inspired by Linear and Stripe), Stockwise balances visual clarity with real-world inventory control tools.

---

## Key Features

### 1. Minimal SaaS Dashboard
- **Total Inventory Value**: Calculated dynamically from all SKU unit prices & quantities.
- **Active Products & Stock Volume**: Real-time units on hand.
- **Stock Health Pills**: Instant visibility into Healthy, Low Stock, and Out of Stock items.
- **Category Filter Chips**: 1-click filtering by category distribution.
- **Activity Audit Trail**: Live log of creations, edits, deletions, and restock events.

### 2. Product Catalog Management
- **Full CRUD**: Add, edit, delete, and inspect product specifications.
- **Direct Stock Stepper**: `+` and `−` quantity adjustments directly within table rows.
- **Reorder Thresholds**: Configurable safety stock levels triggering low-stock indicators.
- **Live Search**: Instant multi-attribute search across names, SKUs, and categories.
- **Filters & Sorting**: Category filtering, stock status filtering, alphabetical (A–Z / Z–A), price, and stock quantity sorting.
- **Pagination**: Clean item-range indicator with page navigation.
- **CSV Data Export**: 1-click export of current filtered view to `.csv` spreadsheet.

### 3. Inventory Replenishment (Low Stock View)
- Dedicated low-stock screen showing depleted items and deficit counts.
- 1-click quick restock buttons (`+5`, `+10`, `+25` units).

### 4. Polished User Experience
- **Understated Design System**: White and soft-grey surfaces with subtle blue accents, clean borders, and zero decorative bloat.
- **Light & Dark Mode**: Persistent theme switcher with `localStorage` sync.
- **Form Validation**: Immediate error messaging for missing names, invalid prices, or negative stock.
- **Confirm Dialogs**: Accessible confirmation modal before removing catalog items.
- **Toast Notifications**: Minimal, auto-dismissing status feedback.
- **Responsive**: Fluid navigation with collapsible mobile drawer.

---

## Tech Stack
- **React 19**
- **Redux Toolkit 2.x** (`@reduxjs/toolkit`, `react-redux`)
- **Vite 8.x**
- **Vanilla CSS** with CSS Custom Properties

---

## Getting Started

```bash
# Navigate to directory
cd 11_React_Redux_Inventory

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev

# Run ESLint check
npm run lint

# Build for production
npm run build
```
