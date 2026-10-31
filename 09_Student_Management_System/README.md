# SMS – Student Management System

A clean, professional Student Management System built using React and connected directly to MongoDB.

Live Link: https://student-management-system-rouge-rho.vercel.app/

---

## Features
- **Application Name**: SMS – Student Management System.
- **Backend as Source of Truth**: Direct integration with MongoDB backend APIs (no fake, static, or local storage placeholder data).
- **CRUD Operations**:
  - View all student records with search, course filtering, and pagination.
  - Add new students with validation.
  - Edit existing student records.
  - Delete students with confirmation prompt.
  - View full student details.
- **Fields**:
  - `name`: Student Name
  - `GRid`: GR ID Number
  - `course`: Course (`full stack development`, `graphic design`, `UI/UX`)
  - `MobileNumber`: 10-digit Mobile Number
  - `_id`: Database ID
- **Design**:
  - Deep Navy Blue, White, and Light Gray palette.
  - Normal plain text student identity (no avatars or photos).
  - Clean Lucide outline icons.
  - Responsive design across desktop, tablet, and mobile.

---

## Run Locally

```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```
