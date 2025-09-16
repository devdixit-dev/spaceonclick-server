
export const booking = (request, response) => {
  try{
    
  }
  catch(err) {
    console.log(`error in booking - ${err}`);
    return response.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}