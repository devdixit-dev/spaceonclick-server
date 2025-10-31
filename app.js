import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';

import connectDatabase from './config/db.config.js';
import bookingRoute from './routes/booking.route.js';
import adminRoute from './routes/admin.route.js';

import Property from './models/property.model.js';

const app = express();
const port = process.env.PORT || 4040;

connectDatabase();

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({
  origin: 'http://localhost:4040',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());

app.use((req, _, next) => {
  console.log(`${req.method} - ${req.url} - ${req.ip}`);
  next();
});

app.use('/booking', bookingRoute);
app.use('/admin', adminRoute);

app.get('/', async (req, res) => {
  try {
    const property = await Property.find()
      .lean()
      .select("-createdAt -updatedAt -__v");

    return res.status(200).json({
      success: true,
      data: property
    });
  }
  catch (err) {
    console.log(`error in home page - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.get('/property/:id', async (req, res) => {
  const id = req.params.id;

  try{
    if(!id) {
      return res.status(403).json({
        success: false,
        message: 'property id is required'
      });
    }

    const property = await Property.findOne({ propertyID: id })
    .lean()
    .select("-createdAt -updatedAt -_id -__v");

    return res.status(200).json({
      success: true,
      message: 'property fetched',
      property
    });
  }
  catch(err) {
    console.log(`error in getting property by id - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port} 🚀`);
});