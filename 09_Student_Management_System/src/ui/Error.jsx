import { Link } from 'react-router-dom';
import { IconArrowLeft } from './Icons';

const Error = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0, color: 'var(--link-color)' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '8px 0 12px', color: 'var(--text-main)' }}>
        Page Not Found
      </h2>
      <p style={{ maxWidth: '400px', color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
        The requested URL was not found on this system.
      </p>

      <Link to="/" className="btn-sms-primary">
        <IconArrowLeft size={16} /> Return to Students Directory
      </Link>
    </div>
  );
};

export default Error;
