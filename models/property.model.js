import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    minLength: [4, 'Property name should at least 4 character long']
  },
  propertyID: {
    type: String
  },
  location: {
    type: String
  },
  size: {
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
  features: [{
    type: String
  }]
});

const Property = mongoose.model('Property', propertySchema);

export default Property;