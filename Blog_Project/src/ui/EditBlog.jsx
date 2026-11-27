import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';

const CATEGORIES = ['Education', 'Travel', 'Food', 'Business', 'Other'];

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showPopup } = useContext(AuthContext);

  const initialBlog = location.state?.blog;

  const [title, setTitle] = useState(initialBlog?.title || '');
  const [category, setCategory] = useState(initialBlog?.category || 'Education');
  const [description, setDescription] = useState(initialBlog?.description || '');
  const [existingImage, setExistingImage] = useState(initialBlog?.image || '');
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(!initialBlog);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialBlog) return;

    api.get('/blog/getAll')
      .then((res) => {
        const list = Array.isArray(res.data?.blogs) ? res.data.blogs : [];
        const found = list.find((b) => String(b._id || b.id) === String(id));
        if (found) {
          setTitle(found.title || '');
          setCategory(found.category || 'Education');
          setDescription(found.description || '');
          setExistingImage(found.image || '');
        }
      })
      .catch((err) => {
        const msg = err.response?.data?.message || 'Failed to load blog';
        showPopup(msg, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, initialBlog, showPopup]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    if (!title.trim() || !description.trim()) {
      showPopup('Title and description are required', 'error');
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('category', category);
      formData.append('description', description.trim());
      if (newImage) {
        formData.append('image', newImage);
      }

      await api.patch('/blog/update/' + id, formData);

      showPopup('Blog updated successfully', 'success');
      navigate('/blogs');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update blog';
      showPopup(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container form-page">
        <p className="message">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container form-page">
      <div className="single-blog-nav">
        <Link to="/blogs" className="btn btn-outline btn-sm">
          &larr; Back to Blogs
        </Link>
      </div>

      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Current Image</label>
          {newImage ? (
            <div className="preview-wrap">
              <img
                src={URL.createObjectURL(newImage)}
                alt="New preview"
                className="image-preview"
              />
            </div>
          ) : existingImage ? (
            <div className="preview-wrap">
              <img
                src={existingImage}
                alt="Current blog"
                className="image-preview"
              />
            </div>
          ) : (
            <p className="text-muted">No image</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="image">Replace Image (optional)</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setNewImage(e.target.files[0] || null)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Updating...' : 'Update Blog'}
          </button>
          <Link to="/blogs" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
