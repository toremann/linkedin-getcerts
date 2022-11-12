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

        const convertTime = (time) => [...time.matchAll(/(\d+)([hms])/g)].reduce((acc, match) => ({...acc, [match[2]]: match[1]}), {})

        const sum = totalTime.reduce(
            (accumulator, currentValue) => accumulator.h + currentValue.h,
            0,
          );

        res.forEach(function (cert) {
            console.log(convertTime(cert.time))
            totalTime.push(convertTime(cert.time));
            
        });

        totalTime.forEach(function (houres) {
            if (typeof houres.h == 'undefined') {
                console.log('No houres found!')
            } else {
                console.log(typeof parseInt(houres.h), houres.h)
            }
        })

        process.exit(1);
    });
})();
