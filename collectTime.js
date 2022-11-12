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
        const timeArr = []
        let total = { houres: 0, minutes: 0, seconds: 0 };;

        const convertTime = (time) => [...time.matchAll(/(\d+)([hms])/g)].reduce((acc, match) => ({...acc, [match[2]]: match[1]}), {})

        res.forEach(function (cert) {
            console.log(convertTime(cert.time))
            timeArr.push(convertTime(cert.time));
            
        });

        for (let i = 0; i < timeArr.length; i++) {
            if (typeof timeArr[i].h == "undefined") {
              total.houres += 0
            } else {
              total.houres += parseInt(timeArr[i].h);
            }
            
            if (typeof timeArr[i].m == "undefined") {
              total.minutes += 0
            } else {
              total.minutes += parseInt(timeArr[i].m);
            }
        
            if (typeof timeArr[i].s == "undefined") {
              total.seconds += 0
            } else {
              total.seconds += parseInt(timeArr[i].s);
            }
        }
        
        console.log(total);

        process.exit(1);
    });
})();
