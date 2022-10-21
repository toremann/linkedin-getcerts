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
        let allUrls = [];

        res.forEach(function (cert) {
            allUrls.push(cert.url);
        });

        console.log(allUrls);
        console.log('certs in db:', allUrls.length);

        process.exit(1);
    });
})();
