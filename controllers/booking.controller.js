import Booking from "../models/booking.model.js";
import Property from "../models/property.model.js";

export const booking = async (request, response) => {
  try {
    const {
      propertyName,
      plan,
      date,
      time,
      firstName,
      lastName,
      email,
      contactNumber,
      companyName,
      details
    } = request.body;

    if (!propertyName || !date || !time || !firstName || !lastName || !email || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "Missing required booking details.",
      });
    }

    const property = await Property.findOne({ propertyName });
    if (!property) {
      return response.status(404).json({
        success: false,
        message: 'property not found or not available'
      });
    }

    if (!property.isAvailable) {
      return response.status(401).json({
        success: false,
        message: 'property is not available at this time'
      });
    }

    const bookingExist = await Booking.findOne({
      propertyID: property.propertyID, date, time
    });

    if (bookingExist) {
      return response.status(401).json({
        success: false,
        message: 'someone already booked this place at this time'
      });
    }

    const booking = await Booking.create({
      propertyID: property._id,
      plan, date, time, firstName, lastName,
      email, contactNumber, companyName, details
    });

    return response.status(201).json({
      success: true,
      message: 'Booking confirmed. We will reach you shortly 😀',
      data: booking
    });
  }
  catch (err) {
    console.log(`error in booking - ${err}`);
    return response.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}