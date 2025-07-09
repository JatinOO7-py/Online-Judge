// import mongoose from "mongoose";
// import "dotenv/config";

// // Remove angle brackets if present
// const uri = process.env.MONGODB_URI.replace(/[<>]/g, '');

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('MongoDB connection error:', err));



// const dbConnect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB", error);
//   }
// };

// export default dbConnect;


import mongoose from "mongoose";
import "dotenv/config";

const dbConnect = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    console.log(uri);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export default dbConnect;