import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, updateEvent, deleteEvent } from '../api/eventApi';
import EditEventModal from '../components/EditEventModal';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await getEvents();
      setEvents(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load events from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleUpdateSave = async (id, updatedData) => {
    try {
      setError('');
      const { data } = await updateEvent(id, updatedData);
      setEvents((prev) => prev.map((item) => (item._id === id ? data : item)));
      setEditingEvent(null);
      setStatusMessage('Event updated successfully.');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update event.');
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmed) return;

    try {
      setError('');
      await deleteEvent(id);
      setEvents((prev) => prev.filter((item) => item._id !== id));
      setStatusMessage('Event deleted successfully.');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete event.');
    }
  };

  const totalAllRegistrations = events.reduce(
    (sum, ev) => sum + (Number(ev.totalRegistrations) || 0),
    0
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Event Dashboard</h1>
          <p className="subtitle">Manage events, dates, venues, and registration counts.</p>
        </div>
        <Link to="/add-event" className="btn btn-primary">
          + Add Event
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Events</span>
          <span className="stat-value">{events.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Registrations</span>
          <span className="stat-value">{totalAllRegistrations}</span>
        </div>
      </div>

      {statusMessage && <div className="alert alert-success">{statusMessage}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="card empty-state">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="card empty-state">
          <p>No events found yet.</p>
          <Link to="/add-event" className="btn btn-primary">
            Create Your First Event
          </Link>
        </div>
      ) : (
        <div className="card table-wrapper">
          <table className="events-table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Venue</th>
                <th>Total Registrations</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev._id}>
                  <td data-label="Event ID" className="id-cell">
                    {ev._id}
                  </td>
                  <td data-label="Event Name">
                    <div className="event-title">{ev.eventName}</div>
                    {ev.eventDescription && (
                      <div className="event-desc">{ev.eventDescription}</div>
                    )}
                  </td>
                  <td data-label="Event Date">{ev.eventDate}</td>
                  <td data-label="Venue">{ev.venue}</td>
                  <td data-label="Total Registrations">
                    <span className="badge">{ev.totalRegistrations ?? 0}</span>
                  </td>
                  <td data-label="Actions" className="actions-cell">
                    <button
                      type="button"
                      className="btn btn-edit"
                      onClick={() => setEditingEvent(ev)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-delete"
                      onClick={() => handleDelete(ev._id, ev.eventName)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EditEventModal
        event={editingEvent}
        onClose={() => setEditingEvent(null)}
        onSave={handleUpdateSave}
      />
    </div>
  );
}

export default Dashboard;