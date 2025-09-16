import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.MONGODB_NAME })
    .then(() => { console.log(`mongodb connected ✅`) })
    .catch((e) => { console.log(`error in mongodb connection ❌ - ${e}`) });
  }
  catch(err) {
    console.error(`Database Error - ${err} ❌`);
    return null;
  }
}

export default connectDatabase;