import express from 'express';
import { addProperty, adminLogin } from '../controllers/admin.controller.js';

const adminRoute = express.Router();

adminRoute.post('/login', adminLogin);

adminRoute.post('/add', addProperty);

export default adminRoute;