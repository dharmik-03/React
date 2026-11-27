import { Link } from 'react-router-dom';

export default function BlogCard({ blog, isOwner, onDelete }) {
  const blogId = blog._id || blog.id;
  const author = typeof blog.author === 'string' ? blog.author : blog.author?.name;

  return (
    <div className="blog-card">
      {blog.image && (
        <img src={blog.image} alt={blog.title} className="blog-card-image" />
      )}
      <div className="blog-card-content">
        <div className="blog-card-top">
          {blog.category && <span className="badge">{blog.category}</span>}
          {author && <span className="blog-card-author">By {author}</span>}
        </div>
        <h3 className="blog-card-title">
          <Link to={'/blogs/' + blogId}>{blog.title}</Link>
        </h3>
        <p className="blog-card-desc">{blog.description}</p>
        <div className="blog-card-footer">
          <Link to={'/blogs/' + blogId} className="btn-link">
            Read More
          </Link>
          {isOwner && (
            <div className="card-actions">
              <Link
                to={'/edit-blog/' + blogId}
                state={{ blog }}
                className="btn btn-secondary btn-xs"
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-danger btn-xs"
                onClick={() => onDelete(blogId)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
