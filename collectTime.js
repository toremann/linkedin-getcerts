const connectDB = require('./db/db');
const Certs = require('./db/Schema');

if (process.env.MONGO_URI) {
    connectDB();
} else {
    console.log('Couldnt find MONGO_URI in .env'.red);
    process.exit(1);
}

(async () => {
    Certs.find({}, function (err, res) {
        let totalTime = [];

        res.forEach(function (cert) {
            totalTime.push(cert.time);
        });

        console.log(totalTime);
        console.log('certs in db:', totalTime.length);

        process.exit(1);
    });
})();
