const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/Event');

const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error: error.message });
  }
});

// GET single event by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Event ID' });
  }
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch event', error: error.message });
  }
});

// POST create new event
router.post('/', async (req, res) => {
  const { eventName, eventDescription, eventDate, venue, totalRegistrations } = req.body;
  try {
    const newEvent = new Event({
      eventName,
      eventDescription,
      eventDate,
      venue,
      totalRegistrations: totalRegistrations !== undefined ? Number(totalRegistrations) : 0,
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create event', error: error.message });
  }
});

// PUT update existing event
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Event ID' });
  }
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        eventDate: req.body.eventDate,
        venue: req.body.venue,
        ...(req.body.totalRegistrations !== undefined && {
          totalRegistrations: Number(req.body.totalRegistrations),
        }),
      },
      { new: true, runValidators: true }
    );
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update event', error: error.message });
  }
});

// DELETE event
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Event ID' });
  }
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully', id: deletedEvent._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event', error: error.message });
  }
});

module.exports = router;