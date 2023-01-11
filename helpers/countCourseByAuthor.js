const connectDB = require('../db/db');
const Certs = require('../db/Schemas/certSchema');

// W.I.P

if (process.env.MONGO_URI) {
    connectDB();
} else {
    console.log('Couldnt find MONGO_URI in .env'.red);
    process.exit(1);
}

(async () => {
    Certs.find({}, function (err, res) {
        let allAuthors = [];

        res.forEach(function (cert) {
            if (allAuthors.find(({ author }) => author === cert.author)) {
                console.log('Found.. skipping');
            } else {
                allAuthors.push(cert.author);
            }
        });

        console.log('All categories:', allAuthors);

        process.exit(1);
    });
})();
