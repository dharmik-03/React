import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AllStudent, DeleteStudent } from '../api/axios';
import { ALLOWED_COURSES } from '../validation/validation';
import { exportStudentsToCSV } from '../utils/csvExport';
import {
  IconSearch,
  IconPlus,
  IconDownload,
  IconEdit,
  IconTrash,
  IconEye,
  IconAlertTriangle,
} from '../ui/Icons';
import Loading from '../ui/Loading';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AllStudent();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to connect to backend server.');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await DeleteStudent(deleteTarget._id);
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      alert('Delete failed on server: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      (student.name && student.name.toLowerCase().includes(term)) ||
      (student.GRid !== undefined && String(student.GRid).includes(term)) ||
      (student.MobileNumber !== undefined && String(student.MobileNumber).includes(term));

    const matchesCourse =
      selectedCourse === 'All' ||
      (student.course && student.course.toLowerCase() === selectedCourse.toLowerCase());

    return matchesSearch && matchesCourse;
  });

  const sortedStudents = sortBy === 'default'
    ? filteredStudents
    : [...filteredStudents].sort((a, b) => {
        if (sortBy === 'name-asc') return (a.name || '').localeCompare(b.name || '');
        if (sortBy === 'name-desc') return (b.name || '').localeCompare(a.name || '');
        if (sortBy === 'grid-asc') return Number(a.GRid || 0) - Number(b.GRid || 0);
        if (sortBy === 'grid-desc') return Number(b.GRid || 0) - Number(a.GRid || 0);
        if (sortBy === 'course-asc') return (a.course || '').localeCompare(b.course || '');
        return 0;
      });

  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage) || 1;
  const paginatedStudents = sortedStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCourse('All');
    setSortBy('default');
    setCurrentPage(1);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
            Student Records
          </h2>
          <p style={{ margin: '3px 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Overview and directory of all registered students
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            className="btn-sms-secondary"
            onClick={() => exportStudentsToCSV(sortedStudents)}
            disabled={sortedStudents.length === 0}
            title="Download CSV"
          >
            <IconDownload size={15} /> <span>Export CSV</span>
          </button>

          <Link to="/add" className="btn-sms-primary">
            <IconPlus size={16} /> <span>Add Student</span>
          </Link>
        </div>
      </div>

      {error && (
        <div style={{ backgroundColor: 'var(--danger-bg)', color: 'var(--danger)', padding: '14px 18px', borderRadius: 'var(--radius)', marginBottom: '18px', border: '1px solid var(--danger-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', fontSize: '0.88rem' }}>
          <div>
            <strong>Database Error: </strong> {error}
          </div>
          <button
            type="button"
            className="btn-sms-secondary"
            style={{ color: 'var(--danger)', borderColor: 'var(--danger-border)' }}
            onClick={loadData}
          >
            Retry Connection
          </button>
        </div>
      )}

      {!error && (
        <div className="stats-summary-bar">
          <div className="metric-box">
            <div className="metric-title">Total Enrolled</div>
            <div className="metric-number">{students.length}</div>
          </div>
          <div className="metric-box">
            <div className="metric-title">Full Stack Dev</div>
            <div className="metric-number">
              {students.filter((s) => s.course === 'full stack development').length}
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-title">Graphic Design</div>
            <div className="metric-number">
              {students.filter((s) => s.course === 'graphic design').length}
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-title">UI/UX Design</div>
            <div className="metric-number">
              {students.filter((s) => s.course === 'UI/UX').length}
            </div>
          </div>
        </div>
      )}

      <div className="sms-card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 260px' }}>
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', pointerEvents: 'none' }}>
              <IconSearch size={15} />
            </span>
            <input
              type="text"
              className="sms-input"
              placeholder="Search by student name, GR ID, or mobile number..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={{ paddingLeft: '32px' }}
            />
          </div>

          <select
            className="sms-select"
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Courses</option>
            {ALLOWED_COURSES.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <select
            className="sms-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="default">Sort: Default</option>
            <option value="name-asc">Name (A to Z)</option>
            <option value="name-desc">Name (Z to A)</option>
            <option value="grid-asc">GR ID (Ascending)</option>
            <option value="grid-desc">GR ID (Descending)</option>
            <option value="course-asc">Course (A to Z)</option>
          </select>

          {(searchTerm !== '' || selectedCourse !== 'All' || sortBy !== 'default') && (
            <button
              type="button"
              className="btn-sms-secondary"
              onClick={resetFilters}
              style={{ padding: '6px 10px', fontSize: '0.82rem' }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      <div className="sms-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="sms-table-container">
          <table className="sms-table">
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th style={{ width: '120px' }}>GR ID</th>
                <th>Full Name</th>
                <th>Course</th>
                <th>Mobile Number</th>
                <th style={{ width: '130px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--text-muted)' }}>
                    No student records found.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student, idx) => (
                  <tr key={student._id}>
                    <td style={{ color: 'var(--text-muted)' }}>
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>
                    <td>
                      <span className="grid-badge">{student.GRid}</span>
                    </td>
                    <td>
                      <Link
                        to={`/student/${student._id}`}
                        style={{ color: 'var(--link-color)', fontWeight: 600, textDecoration: 'none' }}
                      >
                        {student.name}
                      </Link>
                    </td>
                    <td>
                      <span className="course-tag">{student.course}</span>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>
                      {student.MobileNumber}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '4px' }}>
                        <Link
                          to={`/student/${student._id}`}
                          className="action-btn"
                          title="View Profile"
                        >
                          <IconEye size={15} />
                        </Link>
                        <Link
                          to={`/edit/${student._id}`}
                          className="action-btn"
                          title="Edit Student"
                        >
                          <IconEdit size={15} />
                        </Link>
                        <button
                          type="button"
                          className="action-btn danger"
                          title="Delete Student"
                          onClick={() => setDeleteTarget(student)}
                        >
                          <IconTrash size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="sms-pagination-bar">
          <div>
            Showing {sortedStudents.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, sortedStudents.length)} of {sortedStudents.length} entries
          </div>

          <div className="pagination-controls">
            <button
              type="button"
              className="page-nav-btn"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', padding: '0 4px' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              className="page-nav-btn"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Modal
        show={Boolean(deleteTarget)}
        onHide={() => !deleting && setDeleteTarget(null)}
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
                Are you sure you want to delete <strong>{deleteTarget?.name}</strong> (GR ID: #{deleteTarget?.GRid})? This action cannot be undone.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDeleteTarget(null)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteConfirm}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete Student'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Student;
