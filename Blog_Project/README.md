# Blog App — React Frontend

A clean, beginner-friendly React blog application built with **React**, **Vite**, **React Router DOM**, **Axios**, and pure CSS. Connected with a REST API backend supporting JWT Authentication, MongoDB, and Cloudinary image uploads.

---

## 📸 Screenshots

> **Note:** Replace the image paths below with your actual screenshot URLs or local paths (e.g., `./screenshots/filename.png`).

### 1. Home Page (All Blogs)
![Home Page / All Blogs](./screenshots/home.png)

---

### 2. Blog Detail Page
![Blog Detail Page](./screenshots/detail.png)

---

### 3. Create Blog Page
![Create Blog Page](./screenshots/create.png)

---

### 4. Edit Blog Page
![Edit Blog Page](./screenshots/edit.png)

---

### 5. Login Page
![Login Page](./screenshots/login.png)

---

### 6. Register Page
![Register Page](./screenshots/register.png)

---

## ✨ Features

- **User Authentication**:
  - User registration with name, email, password, phone, address, and profile photo upload
  - Secure login with JWT token storage in `localStorage`
  - Automatic session check on page refresh
  - Clean logout with session cleanup
  - Top-center toast notification for login, logout, and error alerts

- **Blog Management**:
  - View all blogs in a clean, responsive card grid
  - Search blogs by title, description, or author name in real-time
  - Filter blogs by category (Education, Travel, Food, Business, Other)
  - View full blog article with author info, category badge, and cover image
  - Create new blogs with image upload
  - Edit existing blogs with pre-filled form and optional image replacement
  - Delete blogs with instant list update

- **Route Protection**:
  - Protected routes for authenticated users (`/blogs`, `/blogs/:id`, `/create-blog`, `/edit-blog/:id`)
  - Automatic redirect to `/login` if not authenticated
  - Automatic redirect to `/blogs` if already logged in

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Routing**: React Router DOM (v7)
- **HTTP Client**: Axios (with Bearer token request interceptor)
- **State Management**: React Context API (`AuthContext`)
- **Styling**: Pure CSS (`App.css`, `index.css`)

---

## 📁 Project Structure

```
Blog_Project/
├── public/
├── src/
│   ├── api/
│   │   └── api.js              # Axios instance and token interceptor
│   ├── components/             # Reusable UI components
│   │   ├── BlogCard.jsx        # Blog card display component
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   └── Popup.jsx           # Toast notification component
│   ├── context/
│   │   └── AuthContext.jsx     # User authentication and toast state
│   ├── ui/                     # Application page views
│   │   ├── BlogDetail.jsx      # Single blog view
│   │   ├── BlogList.jsx        # Home / all blogs list with search & filter
│   │   ├── CreateBlog.jsx      # New blog creation form
│   │   ├── EditBlog.jsx        # Edit existing blog form
│   │   ├── Login.jsx           # User sign-in page
│   │   └── Register.jsx        # New user registration page
│   ├── App.css                 # Main application styles
│   ├── App.jsx                 # App routes and layout configuration
│   ├── index.css               # Global styles import
│   └── main.jsx                # React root entry point
├── .env                        # Backend API base URL
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Environment Setup

Create or update the `.env` file in the root directory:

```env
VITE_API_URL=https://node-js-3-b4p3.onrender.com/
```

> If testing with a local backend server:
> ```env
> VITE_API_URL=http://localhost:5000
> ```

---

## 🔌 API Endpoints Reference

All requests use the base URL defined in `.env`:

### User Endpoints
| Method | Route | Description | Auth Required |
|---|---|---|---|
| `POST` | `/user/add` | Register new user with profile image (`multipart/form-data`) | No |
| `POST` | `/user/login` | Login with email & password | No |
| `POST` | `/user/authLogin` | Verify current token and fetch user details | Yes |
| `POST` | `/user/logOut` | Log out user | Yes |

### Blog Endpoints
| Method | Route | Description | Auth Required |
|---|---|---|---|
| `GET` | `/blog/getAll` | Fetch all published blogs | Yes |
| `POST` | `/blog/add` | Create a new blog with cover image (`multipart/form-data`) | Yes |
| `PATCH` | `/blog/update/:id` | Update title, description, category, or replace image | Yes |
| `DELETE` | `/blog/delete/:id` | Delete a blog by ID | Yes |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd Blog_Project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```

### 5. Preview production build
```bash
npm run preview
```
