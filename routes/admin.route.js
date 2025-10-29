import express from 'express';
import { addProperty, adminLogin, adminLogout, allBookings, changeBookingStatus, deleteProperty, editProperty } from '../controllers/admin.controller.js';
import upload from '../services/multer.service.js';

const adminRoute = express.Router();

adminRoute.post('/login', adminLogin);

adminRoute.get('/bookings', allBookings);

adminRoute.post('/add', upload.array('images', 5), addProperty);

adminRoute.put('/property/update/:id', editProperty);

adminRoute.delete('/property/delete/:id', deleteProperty);

adminRoute.put('/booking/:id', changeBookingStatus);

adminRoute.post('/logout', adminLogout);

export default adminRoute;