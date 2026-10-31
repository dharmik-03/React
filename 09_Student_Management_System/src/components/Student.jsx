import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AllStudent, DeleteStudent, AddStudent } from '../api/axios';
import { ALLOWED_COURSES } from '../validation/validation';
import { exportStudentsToCSV } from '../utils/csvExport';
import {
  IconSearch,
  IconPlus,
  IconDownload,
  IconUpload,
  IconEdit,
  IconTrash,
  IconEye,
  IconAlertTriangle,
  IconClose,
  IconArrowUpDown,
} from '../ui/Icons';
import Loading from '../ui/Loading';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import StudentProfile from './StudentProfile';

const Student = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [selectedIds, setSelectedIds] = useState([]);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const [deleteModalState, setDeleteModalState] = useState({ show: false, student: null, deleting: false });
  const [previewStudentId, setPreviewStudentId] = useState(null);

  const [showImportModal, setShowImportModal] = useState(false);
  const [importParsedRows, setImportParsedRows] = useState([]);
  const [importing, setImporting] = useState(false);
  const [importFeedback, setImportFeedback] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AllStudent();
      setStudents(Array.isArray(data) ? data : []);
      setSelectedIds([]);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Failed to connect to backend server.');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDeleteConfirm = async () => {
    if (!deleteModalState.student) return;

    try {
      setDeleteModalState((prev) => ({ ...prev, deleting: true }));
      await DeleteStudent(deleteModalState.student._id);
      setDeleteModalState({ show: false, student: null, deleting: false });
      await loadData();
    } catch (err) {
      alert('Delete failed on server: ' + err.message);
      setDeleteModalState((prev) => ({ ...prev, deleting: false }));
    }
  };

  const handleBulkDeleteConfirm = async () => {
    if (selectedIds.length === 0) return;

    try {
      setBulkDeleting(true);
      await Promise.all(selectedIds.map((id) => DeleteStudent(id)));
      setShowBulkDeleteModal(false);
      setSelectedIds([]);
      await loadData();
    } catch (err) {
      alert('Bulk delete failed: ' + err.message);
    } finally {
      setBulkDeleting(false);
    }
  };

  const filteredStudents = useMemo(() => {
    const list = students.filter((student) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (student.name && student.name.toLowerCase().includes(q)) ||
        (student.GRid !== undefined && String(student.GRid).includes(q)) ||
        (student.MobileNumber !== undefined && String(student.MobileNumber).includes(q));

      const matchesCourse =
        selectedCourse === 'All' ||
        (student.course && student.course.toLowerCase() === selectedCourse.toLowerCase());

      return matchesSearch && matchesCourse;
    });

    if (sortBy === 'default') {
      return list;
    }

    return [...list].sort((a, b) => {
      if (sortBy === 'name-asc') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (sortBy === 'name-desc') {
        return (b.name || '').localeCompare(a.name || '');
      }
      if (sortBy === 'grid-asc') {
        return Number(a.GRid || 0) - Number(b.GRid || 0);
      }
      if (sortBy === 'grid-desc') {
        return Number(b.GRid || 0) - Number(a.GRid || 0);
      }
      if (sortBy === 'course-asc') {
        return (a.course || '').localeCompare(b.course || '');
      }
      return 0;
    });
  }, [students, searchTerm, selectedCourse, sortBy]);

  const totalItems = filteredStudents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  const isAllVisibleSelected =
    paginatedStudents.length > 0 &&
    paginatedStudents.every((s) => selectedIds.includes(s._id));

  const handleToggleSelectAll = () => {
    if (isAllVisibleSelected) {
      const visibleIds = paginatedStudents.map((s) => s._id);
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      const newIds = paginatedStudents.map((s) => s._id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...newIds])));
    }
  };

  const handleToggleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCourse('All');
    setSortBy('default');
    setCurrentPage(1);
  };

  const handleSortHeader = (type) => {
    if (type === 'name') {
      setSortBy((prev) => (prev === 'name-asc' ? 'name-desc' : 'name-asc'));
    } else if (type === 'grid') {
      setSortBy((prev) => (prev === 'grid-asc' ? 'grid-desc' : 'grid-asc'));
    } else if (type === 'course') {
      setSortBy((prev) => (prev === 'course-asc' ? 'default' : 'course-asc'));
    }
    setCurrentPage(1);
  };

  const handleCSVFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportFeedback(null);
    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const text = evt.target?.result;
        if (typeof text !== 'string') return;

        const lines = text.split(/\r\n|\n/).filter((l) => l.trim() !== '');
        if (lines.length < 2) {
          setImportFeedback({ error: 'CSV file is empty or missing data rows.' });
          return;
        }

        const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, '').toLowerCase());
        const nameIdx = headers.indexOf('name');
        const gridIdx = headers.indexOf('grid') !== -1 ? headers.indexOf('grid') : headers.indexOf('gr id');
        const courseIdx = headers.indexOf('course');
        const mobileIdx = headers.indexOf('mobilenumber') !== -1 ? headers.indexOf('mobilenumber') : headers.indexOf('mobile number');

        if (nameIdx === -1 || gridIdx === -1 || courseIdx === -1 || mobileIdx === -1) {
          setImportFeedback({
            error: 'Invalid CSV headers. Required headers: name, GRid, course, MobileNumber',
          });
          return;
        }

        const parsed = [];
        const existingGrids = new Set(students.map((s) => Number(s.GRid)));
        const seenInFile = new Set();

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
          if (cols.length < 4) continue;

          const rowName = cols[nameIdx];
          const rowGrid = Number(cols[gridIdx]);
          const rowCourse = cols[courseIdx]?.toLowerCase();
          const rowMobile = String(cols[mobileIdx]).replace(/\D/g, '');

          let errorMsg = '';

          if (!rowName || rowName.length < 2) {
            errorMsg = 'Name must be at least 2 chars';
          } else if (isNaN(rowGrid) || rowGrid <= 0) {
            errorMsg = 'Invalid GR ID number';
          } else if (existingGrids.has(rowGrid)) {
            errorMsg = `GR ID ${rowGrid} already in database`;
          } else if (seenInFile.has(rowGrid)) {
            errorMsg = `Duplicate GR ID ${rowGrid} in file`;
          } else if (!ALLOWED_COURSES.includes(rowCourse)) {
            errorMsg = `Invalid course: ${rowCourse}`;
          } else if (rowMobile.length !== 10) {
            errorMsg = 'Mobile number must be 10 digits';
          }

          seenInFile.add(rowGrid);

          parsed.push({
            rowNumber: i,
            name: rowName,
            GRid: rowGrid,
            course: rowCourse,
            MobileNumber: rowMobile,
            isValid: !errorMsg,
            errorMsg,
          });
        }

        setImportParsedRows(parsed);
      } catch (parseErr) {
        setImportFeedback({ error: 'Failed to parse CSV: ' + parseErr.message });
      }
    };

    reader.readAsText(file);
  };

  const executeCSVImport = async () => {
    const validRows = importParsedRows.filter((r) => r.isValid);
    if (validRows.length === 0) return;

    try {
      setImporting(true);
      let successCount = 0;

      for (const row of validRows) {
        await AddStudent({
          name: row.name,
          GRid: row.GRid,
          course: row.course,
          MobileNumber: row.MobileNumber,
        });
        successCount++;
      }

      setImportFeedback({ success: `Successfully imported ${successCount} student record(s)!` });
      setImportParsedRows([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
      await loadData();
    } catch (err) {
      setImportFeedback({ error: 'Import failed: ' + err.message });
    } finally {
      setImporting(false);
    }
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
            onClick={() => exportStudentsToCSV(filteredStudents)}
            disabled={filteredStudents.length === 0}
            title="Download CSV"
          >
            <IconDownload size={15} /> <span>Export CSV</span>
          </button>

          <button
            type="button"
            className="btn-sms-secondary"
            onClick={() => setShowImportModal(true)}
            title="Import Students from CSV"
          >
            <IconUpload size={15} /> <span>Import CSV</span>
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
          <div style={{ position: 'relative', flex: '1 1 420px', minWidth: '340px' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', pointerEvents: 'none' }}>
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
              style={{ width: '100%', height: '38px', paddingLeft: '36px', paddingRight: searchTerm ? '32px' : '12px' }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, display: 'flex' }}
              >
                <IconClose size={13} />
              </button>
            )}
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
            title="Sort Records"
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
              onClick={handleResetFilters}
              style={{ padding: '6px 10px', fontSize: '0.82rem' }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="bulk-actions-bar">
          <div>
            <strong>{selectedIds.length}</strong> student record{selectedIds.length > 1 ? 's' : ''} selected
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="btn-sms-secondary"
              onClick={() => setSelectedIds([])}
            >
              Clear Selection
            </button>
            <button
              type="button"
              className="btn-sms-danger"
              onClick={() => setShowBulkDeleteModal(true)}
            >
              <IconTrash size={14} /> Delete Selected ({selectedIds.length})
            </button>
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="sms-data-table">
          <thead>
            <tr>
              <th style={{ width: '40px', textAlign: 'center' }}>
                <input
                  type="checkbox"
                  className="sms-checkbox"
                  checked={isAllVisibleSelected}
                  onChange={handleToggleSelectAll}
                  aria-label="Select all rows on page"
                />
              </th>
              <th style={{ width: '50px' }}>#</th>
              <th
                className="sortable-th"
                style={{ width: '120px' }}
                onClick={() => handleSortHeader('grid')}
                title="Click to sort by GR ID"
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  GR ID <IconArrowUpDown size={12} />
                </div>
              </th>
              <th
                className="sortable-th"
                onClick={() => handleSortHeader('name')}
                title="Click to sort by Name"
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Full Name <IconArrowUpDown size={12} />
                </div>
              </th>
              <th
                className="sortable-th"
                onClick={() => handleSortHeader('course')}
                title="Click to sort by Course"
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Course <IconArrowUpDown size={12} />
                </div>
              </th>
              <th>Mobile Number</th>
              <th style={{ width: '130px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--text-muted)' }}>
                  No student records found.
                </td>
              </tr>
            ) : (
              paginatedStudents.map((student, idx) => {
                const isChecked = selectedIds.includes(student._id);
                return (
                  <tr key={student._id} className={isChecked ? 'selected-row' : ''}>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        className="sms-checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleSelectRow(student._id)}
                        aria-label={`Select ${student.name}`}
                      />
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>
                      {startIndex + idx + 1}
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
                      <span className="badge-course">{student.course}</span>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>
                      {student.MobileNumber}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="action-group" style={{ justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn-action-text"
                          title="Quick Preview"
                          onClick={() => setPreviewStudentId(student._id)}
                        >
                          <IconEye size={13} />
                        </button>
                        <button
                          type="button"
                          className="btn-action-text"
                          title="Edit Student"
                          onClick={() => navigate(`/edit/${student._id}`)}
                        >
                          <IconEdit size={13} />
                        </button>
                        <button
                          type="button"
                          className="btn-action-text delete"
                          title="Delete Student"
                          onClick={() =>
                            setDeleteModalState({ show: true, student, deleting: false })
                          }
                        >
                          <IconTrash size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="pagination-bar">
          <div className="pagination-text">
            Showing {filteredStudents.length === 0 ? 0 : startIndex + 1} to{' '}
            {Math.min(startIndex + itemsPerPage, filteredStudents.length)} of {filteredStudents.length} entries
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Rows:</span>
              <select
                className="sms-select"
                style={{ padding: '3px 8px', fontSize: '0.82rem' }}
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="pagination-buttons">
              <button
                type="button"
                className="page-item-btn"
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
                className="page-item-btn"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={deleteModalState.show}
        onHide={() => !deleteModalState.deleting && setDeleteModalState({ show: false, student: null, deleting: false })}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton={!deleteModalState.deleting}>
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
                Are you sure you want to delete <strong>{deleteModalState.student?.name}</strong> (GR ID: #{deleteModalState.student?.GRid})? This action cannot be undone.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDeleteModalState({ show: false, student: null, deleting: false })}
            disabled={deleteModalState.deleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteConfirm}
            disabled={deleteModalState.deleting}
          >
            {deleteModalState.deleting ? 'Deleting...' : 'Delete Student'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showBulkDeleteModal}
        onHide={() => !bulkDeleting && setShowBulkDeleteModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton={!bulkDeleting}>
          <Modal.Title style={{ fontSize: '1.05rem', fontWeight: 600 }}>Confirm Bulk Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--danger)', flexShrink: 0 }}>
              <IconAlertTriangle size={24} />
            </div>
            <div>
              <p style={{ margin: '0 0 6px', fontWeight: 600, color: 'var(--text-main)' }}>
                Delete {selectedIds.length} selected records permanently?
              </p>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                This will delete all {selectedIds.length} chosen student records from the database. This action cannot be undone.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowBulkDeleteModal(false)}
            disabled={bulkDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleBulkDeleteConfirm}
            disabled={bulkDeleting}
          >
            {bulkDeleting ? 'Deleting...' : `Delete ${selectedIds.length} Records`}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={Boolean(previewStudentId)}
        onHide={() => setPreviewStudentId(null)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1.05rem', fontWeight: 600 }}>Quick Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '20px' }}>
          {previewStudentId && (
            <StudentProfile
              studentId={previewStudentId}
              isModal={true}
              onClose={(wasDeleted) => {
                setPreviewStudentId(null);
                if (wasDeleted) loadData();
              }}
            />
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={showImportModal}
        onHide={() => {
          if (!importing) {
            setShowImportModal(false);
            setImportParsedRows([]);
            setImportFeedback(null);
          }
        }}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton={!importing}>
          <Modal.Title style={{ fontSize: '1.05rem', fontWeight: 600 }}>Import Students from CSV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: '0 0 10px' }}>
              Select a CSV file with columns: <code>name</code>, <code>GRid</code>, <code>course</code>, <code>MobileNumber</code>.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              onChange={handleCSVFileChange}
              disabled={importing}
              className="sms-input"
              style={{ padding: '6px 10px' }}
            />
          </div>

          {importFeedback?.error && (
            <div style={{ backgroundColor: 'var(--danger-bg)', color: 'var(--danger)', padding: '10px 14px', borderRadius: 'var(--radius)', fontSize: '0.85rem', marginBottom: '14px', border: '1px solid var(--danger-border)' }}>
              {importFeedback.error}
            </div>
          )}

          {importFeedback?.success && (
            <div style={{ backgroundColor: '#ecfdf5', color: '#047857', padding: '10px 14px', borderRadius: 'var(--radius)', fontSize: '0.85rem', marginBottom: '14px', border: '1px solid #a7f3d0' }}>
              {importFeedback.success}
            </div>
          )}

          {importParsedRows.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.84rem' }}>
                <span>Parsed {importParsedRows.length} rows ({importParsedRows.filter((r) => r.isValid).length} valid, {importParsedRows.filter((r) => !r.isValid).length} invalid)</span>
              </div>
              <div style={{ maxHeight: '240px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)' }}>
                <table className="sms-table" style={{ fontSize: '0.82rem' }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>GR ID</th>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Mobile</th>
                      <th>Validation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importParsedRows.map((row) => (
                      <tr key={row.rowNumber} style={{ backgroundColor: row.isValid ? 'transparent' : 'var(--danger-bg)' }}>
                        <td>{row.rowNumber}</td>
                        <td>{row.GRid}</td>
                        <td>{row.name}</td>
                        <td>{row.course}</td>
                        <td>{row.MobileNumber}</td>
                        <td style={{ color: row.isValid ? '#059669' : 'var(--danger)' }}>
                          {row.isValid ? 'Valid' : row.errorMsg}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowImportModal(false);
              setImportParsedRows([]);
              setImportFeedback(null);
            }}
            disabled={importing}
          >
            Close
          </Button>
          <Button
            variant="primary"
            className="btn-sms-primary"
            onClick={executeCSVImport}
            disabled={importing || importParsedRows.filter((r) => r.isValid).length === 0}
          >
            {importing ? 'Importing...' : `Import ${importParsedRows.filter((r) => r.isValid).length} Records`}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Student;
