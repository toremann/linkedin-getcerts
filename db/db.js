require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${conn.connection.host}\n`);
    } catch (error) {
        console.log(`MongoDB error: ${error}\n`);
        process.exit(1);
    }
};

module.exports = connectDB;
