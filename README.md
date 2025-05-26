# AttendEase 

This is a Next.js application for managing student attendance using MongoDB as the Database.

## Getting Started

1. *Install dependencies:*
    bash
    npm install
    
2. *Run the development server:*
    bash
    npm run dev
    
    The application will be available at http://localhost:9002.


## Credentials

- *Admin:*
  - Email: admin@example.com
  - Password: any 6+ characters
- *Teacher:*
  - Email: teacher@example.com
  - Password: any 6+ characters
- *Student:*
  - Email: student@example.com (or any other @example.com email)
  - Password: any 6+ characters

You can switch roles by logging out and logging in with a different @example.com email prefix.

## Features (Role-Based)

- *Admin:*
  - View Dashboard stats (overall)
  - Manage Attendance (mark, view, export)
  - Manage Students (CRUD operations)
  - Review Absence Explanations (Approve/Reject)
  - Manage Users (CRUD operations for non-admins)
- *Teacher:*
  - View Dashboard stats (overall)
  - Manage Attendance (mark, view, export)
  - View Students (Read-only)
  - Review Absence Explanations (Approve/Reject)
- *Student:*
  - View Dashboard stats (personal)
  - View Personal Attendance records
  - Submit and View Personal Absence Explanations
  - View Personal Profile (basic)
  - view subject wise attendance