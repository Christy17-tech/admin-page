import React, { useState, useEffect } from 'react';

function EditEventModal({ event, onClose, onSave }) {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    eventDate: '',
    venue: '',
    totalRegistrations: 0,
  });

  useEffect(() => {
    if (event) {
      setFormData({
        eventName: event.eventName || '',
        eventDescription: event.eventDescription || '',
        eventDate: event.eventDate ? event.eventDate.slice(0, 10) : '',
        venue: event.venue || '',
        totalRegistrations: event.totalRegistrations ?? 0,
      });
    }
  }, [event]);

  if (!event) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(event._id, {
      ...formData,
      totalRegistrations: Number(formData.totalRegistrations),
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Update Event</h2>
          <button type="button" className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="edit-eventName">Event Name</label>
            <input
              id="edit-eventName"
              name="eventName"
              type="text"
              value={formData.eventName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-eventDescription">Event Description</label>
            <textarea
              id="edit-eventDescription"
              name="eventDescription"
              rows="3"
              value={formData.eventDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-eventDate">Event Date</label>
              <input
                id="edit-eventDate"
                name="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-venue">Venue</label>
              <input
                id="edit-venue"
                name="venue"
                type="text"
                value={formData.venue}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-totalRegistrations">Total Registrations</label>
            <input
              id="edit-totalRegistrations"
              name="totalRegistrations"
              type="number"
              min="0"
              value={formData.totalRegistrations}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEventModal;