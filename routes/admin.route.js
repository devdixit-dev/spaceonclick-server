import express from 'express';
import { addProperty, adminLogin, adminLogout, allBookings, changeBookingStatus, deleteProperty, editProperty } from '../controllers/admin.controller.js';

const adminRoute = express.Router();

adminRoute.post('/login', adminLogin);

adminRoute.post('/bookings', allBookings);

adminRoute.post('/add', addProperty);

adminRoute.put('/property/update/:id', editProperty);

adminRoute.delete('/property/delete/:id', deleteProperty);

adminRoute.put('/booking/:id', changeBookingStatus);

adminRoute.post('/logout', adminLogout);

export default adminRoute;