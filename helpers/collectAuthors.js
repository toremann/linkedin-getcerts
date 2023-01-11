const connectDB = require('../db/db');
const Certs = require('../db/Schemas/certSchema');

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
            allAuthors.push(cert.author);
        });

        const sortedAuthors = allAuthors.filter((author, index) => {
            return allAuthors.indexOf(author) === index;
        });

        console.log('All categories:', sortedAuthors);

        process.exit(1);
    });
})();
