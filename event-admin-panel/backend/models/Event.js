const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, 'Event Name is required'],
      trim: true,
    },
    eventDescription: {
      type: String,
      required: [true, 'Event Description is required'],
      trim: true,
    },
    eventDate: {
      type: String,
      required: [true, 'Event Date is required'],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
    },
    totalRegistrations: {
      type: Number,
      default: 0,
      min: [0, 'Total registrations cannot be negative'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);