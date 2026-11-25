import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/eventApi';

function AddEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    eventDate: '',
    venue: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      await createEvent(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add event. Please check all fields.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container narrow">
      <div className="page-header">
        <div>
          <h1>Add Event</h1>
          <p className="subtitle">Create a new event for registration tracking.</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="card event-form">
        <div className="form-group">
          <label htmlFor="eventName">Event Name</label>
          <input
            id="eventName"
            name="eventName"
            type="text"
            placeholder="e.g., Full Stack Developer Summit"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDescription">Event Description</label>
          <textarea
            id="eventDescription"
            name="eventDescription"
            rows="4"
            placeholder="Enter event details, agenda, or instructions..."
            value={formData.eventDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="eventDate">Event Date</label>
            <input
              id="eventDate"
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="venue">Venue</label>
            <input
              id="venue"
              name="venue"
              type="text"
              placeholder="e.g., Main Auditorium / Hall B"
              value={formData.venue}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;