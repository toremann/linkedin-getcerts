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
        const timeArr = [];

        let total = { houres: 0, minutes: 0, seconds: 0 };

        const convertTime = (time) => [...time.matchAll(/(\d+)([hms])/g)].reduce((acc, match) => ({ ...acc, [match[2]]: match[1] }), {});

        res.forEach(function (cert) {
            timeArr.push(convertTime(cert.time));
        });

        for (let i = 0; i < timeArr.length; i++) {
            if (typeof timeArr[i].h !== 'undefined') total.houres += parseInt(timeArr[i].h);
            if (typeof timeArr[i].m !== 'undefined') total.minutes += parseInt(timeArr[i].m);
            if (typeof timeArr[i].s !== 'undefined') total.seconds += parseInt(timeArr[i].s);
        }

        const toMinutes = (totalSeconds) => {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            total.minutes += minutes;
            total.seconds = seconds;
        };

        toMinutes(total.seconds);

        const toHours = (totalMinutes) => {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            total.houres += hours;
            total.minutes = minutes;
        };

        toHours(total.minutes);

        console.log('Total time:', total);

        process.exit(1);
    });
})();
