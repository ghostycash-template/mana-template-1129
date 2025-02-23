import mongoose from "mongoose";

const connectDB = async()=>{
    try {
      await mongoose.connect(`${process.env.MONGODB_URI}`)
       console.log(`MongoDb connected`)
    } catch (error) {
        console.log("Error in connecting database",error)
    }
}

export default connectDB;