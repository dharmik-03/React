export const exportStudentsToCSV = (students, filename = 'students_database_export') => {
  if (!students || students.length === 0) {
    alert('No student records to export.');
    return;
  }

  const headers = ['Sr No', 'Student Name', 'GR ID', 'Course', 'Mobile Number', 'Database ID'];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const s = String(val);
    if (s.includes('"') || s.includes(',') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return `"${s}"`;
  };

  const rows = students.map((s, idx) => [
    idx + 1,
    escapeCSV(s.name),
    escapeCSV(s.GRid),
    escapeCSV(s.course),
    escapeCSV(s.MobileNumber),
    escapeCSV(s._id || s.id),
  ]);

  const csvContent = [
    headers.map((h) => `"${h}"`).join(','),
    ...rows.map((r) => r.join(',')),
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
