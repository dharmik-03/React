import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './ui/Login';
import Register from './ui/Register';
import BlogList from './ui/BlogList';
import BlogDetail from './ui/BlogDetail';
import CreateBlog from './ui/CreateBlog';
import EditBlog from './ui/EditBlog';
import './App.css';

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p className="message">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function AppRoutes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p className="message">Loading...</p>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={user ? <Navigate to="/blogs" replace /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/blogs"
        element={
          <ProtectedRoute>
            <BlogList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blogs/:id"
        element={
          <ProtectedRoute>
            <BlogDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-blog"
        element={
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-blog/:id"
        element={
          <ProtectedRoute>
            <EditBlog />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/blogs" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
