# Job Application Portal

A full-stack job application portal designed to help users search and apply for jobs while enabling recruiters to post and manage job openings efficiently through an interactive and user-friendly interface. The system provides seamless frontend-backend integration with secure authentication and real-time application management.

---

# Features

* User registration and login authentication
* Search and apply for jobs online
* Recruiter job posting and management system
* Applicant tracking and profile management
* Resume/document upload functionality
* Real-time job retrieval and application handling
* Responsive frontend interface for users and recruiters
* MongoDB database integration for storing users, jobs, and applications
* REST API integration for frontend-backend communication
* Dynamic dashboard for managing applications and job posts

---

# Technologies Used

## Frontend

* HTML
* CSS
* JavaScript

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Tools & Libraries

* REST APIs
* dotenv
* npm
* Multer

---

# Project Structure

```text id="c0z7x8"
Job-Portal/
│
├── images/
│   ├── online-application.png
│   ├── photo_bg.jpg
│
├── uploads/
├── node_modules/
├── lib/
│
├── applicants.html
├── home.html
├── index.html
├── login.html
├── postjob.html
├── profile.html
├── register.html
├── searchjob.html
├── yourposts.html
│
├── style.css
├── script.js
├── server.js
│
├── package.json
├── package-lock.json
└── .env
```

---

# Application Flow

1. User accesses the job portal through the frontend interface.
2. User registers or logs into the system securely.
3. Applicants search and apply for available jobs.
4. Recruiters post and manage job openings through the dashboard.
5. Frontend sends requests to the Express.js backend using REST APIs.
6. Backend processes requests and stores/retrieves data from MongoDB.
7. Application status and job information are updated dynamically for users and recruiters.

---

# Future Improvements

* Add email notifications for application updates
* Implement advanced job filtering and recommendations
* Add interview scheduling functionality
* Introduce admin dashboard and role-based access
* Add real-time chat between recruiters and applicants
* Deploy application using Vercel or Render
* Integrate resume parsing and analytics dashboard
