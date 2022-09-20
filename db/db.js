require('dotenv').config();
const colors = require('colors');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${conn.connection.host}\n`.blue.underline);
    } catch (error) {
        console.log(`MongoDB error: ${error}\n`.red);
        process.exit(1);
    }
};

module.exports = connectDB;
