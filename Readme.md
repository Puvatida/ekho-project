# Work Distribution – Server-Side (Backend)

## Project Overview

This document outlines the contributions and responsibilities of each team member for the server-sdie of the web application.
The backend includes authentication, posts, comments, communities, reporting, and role-based access control.

---

## Team Contributions

### Leyre Raga Mosteiro - 3131025

**Role:** Admin Features, Permissions & Security

**Summary of Work:**

* Implemented **admin controls** and permissions
* Developed **middleware for role-based access**
* Improved **security and authorization logic**
* Fixed bugs and improved backend stability

**Key Contributions:**

* Middleware for:
  * Admins & post creators → *edit/delete posts*
  * Admins & comment creators → *delete comments*

* Enhanced **community security**

* Fixed **admin-related issues**

* General debugging and code improvements

* Added comments for better readability

---

### Asralt Enkhbadral - 3105292

**Role:** Routing, Communities & Integration

**Summary of Work:**

* Designed backend **routing structure**
* Implemented **community features**
* Enabled **frontend-backend communication**

**Key Contributions:**

* Completed **admin & post routes**

* Created **community system**:
  * Community schema
  * Create/Delete routes
  
* Integrated backend APIs with frontend

---

### Puvatida Simcharoen - 3110297

**Role:** Core Backend, Models & CRUD Operations

**Summary of Work:**

* Built **core backend architecture**
* Implemented **database models and schemas**
* Developed **CRUD functionality** across features

**Key Contributions:**

* Authentication system (`auth.js`)
* User routes:
  * View profile
  * Delete own profile

* Post system:
  * Create, update, delete, search
  * Feed retrieval

* Comment system:
  * Full CRUD (GET, CREATE, UPDATE, DELETE)

* Report system:
  * Reports for Post, Comment, User
  * *(Community reporting pending)*

* Middleware:
  * Post, Comment, Community

* Models:
  * Post, Comment, Report
* Bug fixes and initial backend setup

---

### Denys Komarovskyi - 3105289


##  Final Notes

As the project progresses, the work load can continue to be distributed across upcomming frontend development.

---
