import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import validationSchema, { ALLOWED_COURSES } from '../validation/validation';
import { AddStudent, UpdateStudent, getStudent, AllStudent } from '../api/axios';
import { IconArrowLeft, IconCheck, IconRotateCcw } from '../ui/Icons';
import Loading from '../ui/Loading';

const StudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({
    name: '',
    GRid: '',
    course: 'full stack development',
    MobileNumber: '',
  });

  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    AllStudent()
      .then((data) => setAllStudents(Array.isArray(data) ? data : []))
      .catch((err) => console.warn(err.message));
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getStudent(id)
        .then((data) => {
          if (data) {
            setInitialValues({
              name: data.name || '',
              GRid: data.GRid !== undefined ? String(data.GRid) : '',
              course: data.course || 'full stack development',
              MobileNumber: data.MobileNumber !== undefined ? String(data.MobileNumber) : '',
            });
          }
        })
        .catch((err) => setApiError(err.message || 'Could not fetch student record.'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <button
            type="button"
            className="btn-sms-secondary"
            onClick={() => navigate('/')}
            style={{ marginBottom: '8px' }}
          >
            <IconArrowLeft size={15} /> Back
          </button>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
            {id ? 'Edit Student Record' : 'Add New Student'}
          </h2>
        </div>
      </div>

      {apiError && (
        <div style={{ backgroundColor: 'var(--danger-bg)', color: 'var(--danger)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '16px', border: '1px solid var(--danger-border)', fontSize: '0.88rem' }}>
          <strong>Error: </strong> {apiError}
        </div>
      )}

      <div className="sms-card">
        <div className="form-title-bar">
          Student Information
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values, { setFieldError }) => {
            try {
              setSubmitting(true);
              setApiError('');

              const parsedGrid = Number(values.GRid);

              const isDuplicate = allStudents.some(
                (s) => Number(s.GRid) === parsedGrid && (!id || String(s._id) !== String(id))
              );

              if (isDuplicate) {
                setFieldError('GRid', `GR ID ${parsedGrid} already exists in the database. Please enter a unique GR ID.`);
                setSubmitting(false);
                return;
              }

              if (id) {
                await UpdateStudent(id, values);
              } else {
                await AddStudent(values);
              }

              navigate('/');
            } catch (err) {
              const msg = err.response?.data?.message || err.message || 'Failed to save student record.';
              setApiError(msg);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, resetForm }) => (
            <Form noValidate>
              <div className="form-group-item">
                <label className="form-label-standard">Student Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. John Doe"
                  className={`form-input-standard ${touched.name && errors.name ? 'is-invalid' : ''}`}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name && (
                  <div className="field-error-text">{errors.name}</div>
                )}
              </div>

              <div className="form-group-item">
                <label className="form-label-standard">GR ID (Numeric) *</label>
                <input
                  type="number"
                  name="GRid"
                  placeholder="e.g. 101"
                  className={`form-input-standard ${touched.GRid && errors.GRid ? 'is-invalid' : ''}`}
                  value={values.GRid}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.GRid && errors.GRid && (
                  <div className="field-error-text">{errors.GRid}</div>
                )}
              </div>

              <div className="form-group-item">
                <label className="form-label-standard">Course *</label>
                <select
                  name="course"
                  className={`form-input-standard ${touched.course && errors.course ? 'is-invalid' : ''}`}
                  value={values.course}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {ALLOWED_COURSES.map((crs) => (
                    <option key={crs} value={crs}>
                      {crs}
                    </option>
                  ))}
                </select>
                {touched.course && errors.course && (
                  <div className="field-error-text">{errors.course}</div>
                )}
              </div>

              <div className="form-group-item">
                <label className="form-label-standard">Mobile Number (10 Digits) *</label>
                <input
                  type="tel"
                  name="MobileNumber"
                  maxLength={10}
                  placeholder="e.g. 9876543210"
                  className={`form-input-standard ${touched.MobileNumber && errors.MobileNumber ? 'is-invalid' : ''}`}
                  value={values.MobileNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.MobileNumber && errors.MobileNumber && (
                  <div className="field-error-text">{errors.MobileNumber}</div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '18px', marginTop: '22px', flexWrap: 'wrap', gap: '10px' }}>
                <button
                  type="button"
                  className="btn-sms-secondary"
                  onClick={() => resetForm({ values: { name: '', GRid: '', course: 'full stack development', MobileNumber: '' } })}
                  disabled={submitting}
                  title="Clear all fields"
                >
                  <IconRotateCcw size={14} />
                  <span>Reset Form</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn-sms-secondary"
                    onClick={() => navigate('/')}
                    disabled={submitting}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn-sms-primary"
                    disabled={submitting}
                  >
                    <IconCheck size={16} />
                    <span>{submitting ? 'Saving...' : id ? 'Update Record' : 'Save Record'}</span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StudentForm;
