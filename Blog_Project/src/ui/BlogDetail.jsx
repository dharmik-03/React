import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, showPopup } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api.get('/blog/getAll')
      .then((res) => {
        const list = Array.isArray(res.data?.blogs) ? res.data.blogs : [];
        const found = list.find((b) => (b._id || b.id) === id);
        if (found) {
          setBlog(found);
        }
      })
      .catch((err) => {
        const msg = err.response?.data?.message || 'Failed to load blog';
        showPopup(msg, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (deleting) return;
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      setDeleting(true);
      await api.delete('/blog/delete/' + id);
      showPopup('Blog deleted successfully', 'success');
      navigate('/blogs');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete blog';
      showPopup(msg, 'error');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="container main-content">
        <p className="message">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container main-content">
        <p className="message">Blog not found.</p>
        <Link to="/blogs" className="btn btn-secondary">
          Back to Blogs
        </Link>
      </div>
    );
  }

  const author = typeof blog.author === 'string' ? blog.author : blog.author?.name;
  const isOwner = Boolean(
    user &&
    ((typeof blog.author === 'object' && blog.author?._id === user._id) ||
     (typeof blog.author === 'string' && (blog.author === user._id || blog.author === user.name)) ||
     (typeof blog.author === 'object' && blog.author?.email === user.email))
  );

  return (
    <div className="container main-content single-blog">
      <div className="single-blog-nav">
        <Link to="/blogs" className="btn btn-outline btn-sm">
          &larr; Back to Blogs
        </Link>
        {isOwner && (
          <div className="blog-actions">
            <Link
              to={'/edit-blog/' + id}
              state={{ blog }}
              className="btn btn-secondary btn-sm"
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>

      <article>
        {blog.category && <span className="badge">{blog.category}</span>}
        <h1 className="single-blog-title">{blog.title}</h1>
        {author && <p className="single-blog-author">By {author}</p>}

        {blog.image && (
          <div className="single-blog-image-wrap">
            <img src={blog.image} alt={blog.title} className="single-blog-image" />
          </div>
        )}

        <div className="blog-body">
          <p>{blog.description}</p>
        </div>
      </article>
    </div>
  );
}
