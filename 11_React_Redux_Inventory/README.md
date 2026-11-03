# Redux Inventory Management System

A modern and responsive Inventory Management Application built with **React, Redux Toolkit, JavaScript, and Vite**. This project provides a practical way to manage products, monitor stock, and understand Redux Toolkit through a real-world inventory management application.

## Features

### Dashboard
- Modern inventory dashboard.
- Total products overview.
- Total stock quantity.
- Total inventory value.
- Low-stock product statistics.

### Product Management
- Add new products.
- Edit existing products.
- Delete products.
- View product details.
- Manage product name, price, quantity, and category.
- Update product stock.

### Search, Sorting & Filtering
- Search products by name.
- Alphabetical sorting (A–Z / Z–A).
- Price sorting (Low to High / High to Low).
- Quantity sorting (Low to High / High to Low).
- Filter products by category.
- Pagination for product lists.

### Inventory Management
- Track available stock.
- Low-stock alerts and indicators.
- Product category management.
- Inventory value calculation.
- Stock updates and monitoring.

### UI/UX
- Modern and clean dashboard design.
- Responsive layout for desktop, tablet, and mobile.
- Light and dark mode.
- Sidebar and navigation.
- Modern cards, tables, forms, and dropdowns.
- Toast notifications.
- Loading and empty states.
- Confirmation dialogs before deleting.
- Form validation.
- Smooth transitions and subtle animations.

## Technologies Used

- React
- JavaScript
- Redux Toolkit
- React Redux
- Vite
- CSS

## Project Structure

```text
11_React_Redux_Inventory/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Add.jsx
│   │   └── List.jsx
│   │
│   ├── feature/
│   │   └── InventorySlice.js
│   │
│   ├── store/
│   │   └── store.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## Redux Toolkit Implementation

This project uses Redux Toolkit for centralized inventory state management.

- **InventorySlice.js:** Manages inventory state, reducers, and actions.
- **store.js:** Configures the Redux store.
- **main.jsx:** Provides the Redux store using Provider.
- **Add.jsx:** Handles product creation and editing.
- **List.jsx:** Handles product listing, searching, sorting, filtering, and product actions.

## Installation & Setup

**1. Clone the repository**

```bash
git clone <your-repository-url>
```

**2. Navigate to the project**

```bash
cd 11_React_Redux_Inventory
```

**3. Install dependencies**

```bash
npm install
```

**4. Start development server**

```bash
npm run dev
```

Open the local URL provided by Vite.

## React & Redux Concepts Learned

- Redux Store Configuration.
- Redux Toolkit createSlice().
- Redux configureStore().
- useSelector() and useDispatch().
- Global State Management.
- CRUD Operations.
- Array Filtering and Sorting.
- Controlled Forms.
- Component Communication.
- Reusable React Components.
- State-driven UI Updates.

## Future Improvements

- Backend API integration.
- Database integration.
- User authentication.
- Product image uploads.
- Inventory reports.
- CSV export.
- Persistent inventory storage.

## Author

**Dharmik**

Built as part of my React and Redux Toolkit learning journey.