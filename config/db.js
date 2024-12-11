const mongoose = require('mongoose');
require('dotenv').config()


// Connect to DB
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://nebiyu21:nebiyu21@cluster0.8ap7c.mongodb.net/pharma_connect");
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.log("MongoDB failed to connect.",error);
        process.exit(1)
    }
}
 
module.exports = connectDB;
 