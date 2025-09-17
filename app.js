import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import connectDatabase from './config/db.config.js';
import bookingRoute from './routes/booking.route.js';
import adminRoute from './routes/admin.route.js';

const app = express();
const port = process.env.PORT || 4040;

connectDatabase();

app.use(express.json());
app.use(cors());
app.use((request, _, next) => {
  console.log(`${request.method} - ${request.url} - ${request.ip}`);
  next();
});

app.use('/booking', bookingRoute);
app.use('/admin', adminRoute);

app.get('/', (_, response) => {
  response.end('Home route working');
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port} 🚀`);
});