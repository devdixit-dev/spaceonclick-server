import express from 'express';
import { booking } from '../controllers/booking.controller.js';

const bookingRoute = express.Router();

bookingRoute.post('/booking', booking);

export default bookingRoute;