import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  propertyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
  plan: {
    type: String
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  contactNumber: {
    type: Number
  },
  companyName: {
    type: String
  },
  details: {
    type: String
  },
  isBookingDone: {
    type: Boolean,
    default: false
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;