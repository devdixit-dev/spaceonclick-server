import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    minLength: [4, 'Property name should at least 4 character long']
  },
  location: {
    type: String
  },
  images: [{
    type: String,
    required: true
  }],
  area: {
    type: Number
  },
  price: {
    type: Number
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    minLength: [8, 'Property description should at least 8 character long']
  },
  amenities: [{
    type: String
  }],
}, {timestamps: true});

const Property = mongoose.model('Property', propertySchema);

export default Property;