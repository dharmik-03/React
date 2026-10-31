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

  const loadStudentProfile = useCallback(async (studentId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStudent(studentId);
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
              <th style={{ width: '220px' }}>Student Full Name</th>
              <td style={{ fontWeight: 600 }}>{student.name}</td>
            </tr>
            <tr>
              <th>GR ID Number</th>
              <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{student.GRid}</td>
            </tr>
            <tr>
              <th>Enrolled Course</th>
              <td style={{ textTransform: 'capitalize' }}>{student.course}</td>
            </tr>
            <tr>
              <th>Mobile Number</th>
              <td>
                <a href={`tel:${student.MobileNumber}`} style={{ color: 'var(--link-color)', textDecoration: 'none' }}>
                  {student.MobileNumber}
                </a>
              </td>
            </tr>
            <tr>
              <th>Database Record ID</th>
              <td style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {student._id}
              </td>
            </tr>
          </tbody>
        </table>

        {isModal && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button
              type="button"
              className="btn-sms-secondary"
              onClick={handlePrint}
            >
              <IconPrinter size={15} /> Print Details
            </button>
          </div>
        )}
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1rem', fontWeight: 600 }}>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--danger)' }}>
              <IconAlertTriangle size={24} />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-main)', fontSize: '0.92rem' }}>
                Delete student record for "{student.name}" (GR ID: {student.GRid})?
              </p>
              <p style={{ margin: '6px 0 0', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                This record will be permanently deleted from the database.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShowDeleteModal(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete Record'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentProfile;
