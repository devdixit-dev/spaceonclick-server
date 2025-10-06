import Property from "../models/property.model.js";
import jwt from 'jsonwebtoken';

export const adminLogin = (req, res) => {
  const { email, password } = req.body;
  try{
    const matchEmail = email === process.env.ADMIN_EMAIL;
    const matchPass = password === process.env.ADMIN_PASS;

    if(!matchEmail && !matchPass) {
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
  catch(err) {
    console.log(`error in admin login - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

export const addProperty = async (req, res) => {
  try{
    const { 
      propertyName, propertyID, location, size, price, 
      description, amenities, features 
    } = req.body;

    const property = await Property.create({
      propertyName, propertyID, location, size, price,
      description, amenities, features
    });

    return res.status(201).json({
      success: true,
      message: 'property added',
      data: property
    });
  }
  catch(err) {
    console.log(`error in adding property - ${err}`);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}