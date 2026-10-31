import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getStudent, DeleteStudent } from '../api/axios';
import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconAlertTriangle,
  IconPrinter,
} from '../ui/Icons';
import Loading from '../ui/Loading';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const StudentProfile = ({ studentId: propStudentId, isModal = false, onClose }) => {
  const routeParams = useParams();
  const navigate = useNavigate();
  const id = propStudentId || routeParams.id;

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadStudentProfile = useCallback(async (targetId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStudent(targetId);
      setStudent(data);
    } catch (err) {
      setError(err.message || 'Unable to fetch student details.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      loadStudentProfile(id);
    }
  }, [id, loadStudentProfile]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await DeleteStudent(student._id);
      setShowDeleteModal(false);
      if (isModal && onClose) {
        onClose(true);
      } else {
        navigate('/');
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !student) {
    return (
      <div className="sms-card text-center" style={{ padding: '36px 16px' }}>
        <h4 style={{ color: 'var(--danger)', marginBottom: '8px', fontSize: '1.1rem' }}>Record Not Found</h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{error || 'Student not found in database.'}</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
          <button className="btn-sms-primary" onClick={() => loadStudentProfile(id)}>
            Retry
          </button>
          <button className="btn-sms-secondary" onClick={() => (isModal && onClose ? onClose() : navigate('/'))}>
            <IconArrowLeft size={15} /> Back to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!isModal && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <button
            type="button"
            className="btn-sms-secondary"
            onClick={() => navigate('/')}
          >
            <IconArrowLeft size={15} /> Back
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="btn-sms-secondary"
              onClick={handlePrint}
              title="Print Student Record"
            >
              <IconPrinter size={15} /> Print Record
            </button>
            <Link to={`/edit/${student._id}`} className="btn-sms-secondary">
              <IconEdit size={15} /> Edit
            </Link>
            <button
              type="button"
              className="btn-sms-secondary"
              style={{ color: 'var(--danger)', borderColor: 'var(--danger-border)' }}
              onClick={() => setShowDeleteModal(true)}
            >
              <IconTrash size={15} /> Delete
            </button>
          </div>
        </div>
      )}

      <div className="sms-card printable-card">
        <div className="form-title-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'block', fontSize: '1.05rem', fontWeight: 700 }}>
              SMS – Student Management System
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Official Student Information Record
            </span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            ID: {student._id}
          </span>
        </div>

        <table className="sms-data-table" style={{ marginTop: '14px' }}>
          <tbody>
            <tr>
              <th style={{ width: '220px' }}>GR ID Number</th>
              <td>
                <span className="grid-badge">{student.GRid}</span>
              </td>
            </tr>
            <tr>
              <th>Full Name</th>
              <td style={{ fontWeight: 600 }}>{student.name}</td>
            </tr>
            <tr>
              <th>Enrolled Course</th>
              <td>
                <span className="badge-course">{student.course}</span>
              </td>
            </tr>
            <tr>
              <th>Registered Mobile Number</th>
              <td>{student.MobileNumber}</td>
            </tr>
            <tr>
              <th>Database Record ID</th>
              <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{student._id}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Modal
        show={showDeleteModal}
        onHide={() => !deleting && setShowDeleteModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton={!deleting}>
          <Modal.Title style={{ fontSize: '1.05rem', fontWeight: 600 }}>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--danger)', flexShrink: 0 }}>
              <IconAlertTriangle size={24} />
            </div>
            <div>
              <p style={{ margin: '0 0 6px', fontWeight: 600, color: 'var(--text-main)' }}>
                Delete student record permanently?
              </p>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                Are you sure you want to delete <strong>{student.name}</strong> (GR ID: #{student.GRid})? This action cannot be undone.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete Student'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentProfile;
