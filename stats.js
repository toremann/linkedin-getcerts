const connectDB = require('./db/db');
const Certs = require('./db/Schemas/certSchema');

if (process.env.MONGO_URI) {
    connectDB();
} else {
    console.log('Couldnt find MONGO_URI in .env'.red);
    process.exit(1);
}
