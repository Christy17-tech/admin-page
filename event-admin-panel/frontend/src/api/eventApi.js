import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/events';

export const getEvents = () => axios.get(API_URL);
export const createEvent = (eventData) => axios.post(API_URL, eventData);
export const updateEvent = (id, eventData) => axios.put(`${API_URL}/${id}`, eventData);
export const deleteEvent = (id) => axios.delete(`${API_URL}/${id}`);