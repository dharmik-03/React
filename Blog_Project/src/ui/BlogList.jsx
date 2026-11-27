import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import BlogCard from '../components/BlogCard';

const CATEGORIES = ['Education', 'Travel', 'Food', 'Business', 'Other'];

export default function BlogList() {
  const { user, showPopup } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/blog/getAll');
      const list = Array.isArray(res.data?.blogs) ? res.data.blogs : [];
      setBlogs(list);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to load blogs';
      showPopup(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await api.delete('/blog/delete/' + id);
      showPopup('Blog deleted successfully', 'success');
      setBlogs((prev) => prev.filter((b) => (b._id || b.id) !== id));
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete blog';
      showPopup(msg, 'error');
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    if (category && blog.category?.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const titleMatch = blog.title?.toLowerCase().includes(q);
      const descMatch = blog.description?.toLowerCase().includes(q);
      const authorName = typeof blog.author === 'string' ? blog.author : blog.author?.name;
      const authorMatch = authorName?.toLowerCase().includes(q);
      return titleMatch || descMatch || authorMatch;
    }
    return true;
  });

  return (
    <div className="container main-content">
      <div className="page-header">
        <h2>Blogs</h2>
        <Link to="/create-blog" className="btn btn-primary">
          Create Blog
        </Link>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="message">Loading blogs...</p>
      ) : filteredBlogs.length === 0 ? (
        <p className="message">No blogs found.</p>
      ) : (
        <div className="blog-grid">
          {filteredBlogs.map((blog) => {
            const blogId = blog._id || blog.id;
            const isOwner = Boolean(
              user &&
              ((typeof blog.author === 'object' && blog.author?._id === user._id) ||
               (typeof blog.author === 'string' && (blog.author === user._id || blog.author === user.name)) ||
               (typeof blog.author === 'object' && blog.author?.email === user.email))
            );
            return (
              <BlogCard
                key={blogId}
                blog={blog}
                isOwner={isOwner}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
