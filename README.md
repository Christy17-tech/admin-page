# Event Registration Admin Panel (MERN Stack)

A full-stack Event Registration Admin Panel built with **MongoDB Atlas, Express.js, React.js, and Node.js (MERN)**. It enables administrators to view, create, update, and delete events along with tracking total registrations through a responsive web interface.

---

## Features

- **Event Dashboard:** Displays all events with **Event ID**, **Event Name**, **Event Date**, **Venue**, and **Total Registrations**, along with summary statistics.
- **Navigation & Routing:** Client-side routing via `react-router-dom` with a sticky navbar switching between **Dashboard** and **Add Event**.
- **Add Event:** Dedicated form to create new events with **Event Name**, **Event Description**, **Event Date**, and **Venue**.
- **Update & Delete:** Inline **Update** modal to edit event details or registration counts and **Delete** action with confirmation prompt.
- **Responsive Design:** Adapts cleanly across desktop, tablet, and mobile viewports.

---

## Tech Stack

- **Frontend:** React.js (Vite), React Router DOM, Axios, Custom Responsive CSS
- **Backend:** Node.js, Express.js, Mongoose, CORS, Dotenv
- **Database:** MongoDB Atlas

---

## Project Structure

```text
event-admin-panel/
├── backend/
│   ├── models/
│   │   └── Event.js          # Mongoose schema for events
│   ├── routes/
│   │   └── eventRoutes.js    # REST API endpoints (CRUD)
│   ├── .env                  # Backend environment variables
│   ├── package.json
│   └── server.js             # Express server & MongoDB connection
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── eventApi.js   # Axios API client
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── EditEventModal.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── AddEvent.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env                  # Frontend environment variables
│   ├── index.html
│   └── package.json
└── README.md# admin-page
test
