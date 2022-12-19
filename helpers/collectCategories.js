const connectDB = require('../db/db');
const Certs = require('../db/Schemas/certSchema');
const statsSchema = require('../db/Schemas/statsSchema');

if (process.env.MONGO_URI) {
    connectDB();
} else {
    console.log('Couldnt find MONGO_URI in .env'.red);
    process.exit(1);
}

(async () => {
    Certs.find({}, function (err, res) {
        let allCats = [];

        res.forEach(function (cert) {
            allCats.push(...cert.category);
        });

        const sortedCats = allCats.filter((cat, index) => {
            return allCats.indexOf(cat) === index;
        });

        console.log('All categories:', sortedCats);

        process.exit(1);
    });
})();
