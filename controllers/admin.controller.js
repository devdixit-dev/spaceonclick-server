import Property from "../models/property.model.js";

export const adminLogin = (request, response) => {}

export const addProperty = async (request, response) => {
  try{
    const { 
      propertyName, propertyID, location, size, price, 
      isAvailable, description, amenities, features 
    } = request.body;

    const property = await Property.create({
      propertyName, propertyID, location, size, price,
      description, amenities, features
    });

    return response.status(201).json({
      success: true,
      message: 'property added',
      data: property
    });
  }
  catch(err) {
    console.log(`error in adding property - ${err}`);
    return response.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}