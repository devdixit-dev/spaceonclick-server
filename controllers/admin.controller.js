import Booking from "../models/booking.model.js";
import Property from "../models/property.model.js";
import jwt from 'jsonwebtoken';

export const adminLogin = (req, res) => {
  const { email, password } = req.body;
  try {
    const matchEmail = email === process.env.ADMIN_EMAIL;
    const matchPass = password === process.env.ADMIN_PASS;

    if (!matchEmail && !matchPass) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect email or password'
      });
    }

    const decodeJwt = jwt.sign(email, process.env.JWT_SEC, {
      expiresIn: '30m'
    });

    return res
      .cookie('token', decodeJwt, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 60 * 1000
      })
      .json({
        success: true,
        message: 'admin login 🎉'
      });
  }
  catch (err) {
    console.log(`error in admin login - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const allBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('propertyID', 'propertyName')

    if (!bookings) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or removed already'
      });
    }

    console.log(bookings);

    return res.status(200).json({
      success: true,
      length: bookings.length,
      bookings
    });
  }
  catch (err) {
    console.log(`error in getting all bookings in admin panel - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const addProperty = async (req, res) => {
  try {
    // Check if images exist
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    const {
      propertyName,
      propertyID,
      location,
      area,
      seatingCapacity,
      description,
      amenities,
      features,
    } = req.body;

    // Convert amenities string to array (if frontend sends comma-separated)
    const amenitiesArray = amenities
      ? amenities.split(",").map((a) => a.trim())
      : [];

    // Build image URLs to access directly via browser
    const imageUrls = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    // Create new property in DB
    const property = await Property.create({
      propertyName,
      propertyID,
      location,
      area,
      seatingCapacity,
      description,
      amenities: amenitiesArray,
      features,
      images: imageUrls, // ✅ multiple image URLs stored
    });

    res.status(201).json({
      success: true,
      message: "Property added successfully",
      data: property,
    });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const editProperty = async (req, res) => {
  const id = req.params.id;
  try {
    const {
      propertyName, location, area, price,
      description, amenities
    } = req.body;

    const property = await Property.findOneAndUpdate({ propertyID: id },
      { propertyName, location, area, price, description, amenities }
    );

    return res.status(200).json({
      success: true,
      message: 'property updated',
      property
    });
  }
  catch (err) {
    console.log(`error in editing property - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const deleteProperty = async (req, res) => {
  const id = req.params.id;
  try {
    await Property.findOneAndDelete({ propertyID: id });

    return res.status(200).json({
      success: true,
      message: 'property deleted'
    });
  }
  catch (err) {
    console.log(`error in deleting property - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const changeBookingStatus = async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await Booking.findOneAndUpdate({ propertyID: id }, { status: 'confirmed' });

    return res.status(200).json({
      success: true,
      message: 'booking confirmed',
      booking
    });
  }
  catch (err) {
    console.log(`error in changing booking status - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const adminLogout = async (req, res) => {
  try {
    return res.clearCookie('token')
      .json({
        success: true,
        message: 'admin logout'
      });
  }
  catch (err) {
    console.log(`error in logout admin - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}