const Certs = require('../db/Schemas/certSchema');

// Get categories

const getCategories = async () => {
    Certs.find({}, function (err, res) {
        let allCats = [];

        res.forEach(function (cert) {
            allCats.push(...cert.category);
        });

        const sortedCats = allCats.filter((cat, index) => {
            return allCats.indexOf(cat) === index;
        });

        return sortedCats;
    });
};

// Get time

const getTime = async () => {
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

        return total;
    });
};

// Get urls

const getUrls = async () => {
    const allUrls = [];

    Certs.find({}, function (err, res) {
        res.forEach(function (cert) {
            allUrls.push(cert.url);
        });
    });
    return allUrls;
};

// Get videos

const getVideos = async () => {
    Certs.find({}, function (err, res) {
        let videos = [];

        res.forEach(function (cert) {
            videos.push(cert.videos);
        });

        const newArr = [];

        let total = { videos: 0 };

        const countVideos = (video) => [...video.matchAll(/(\d+)/g)].reduce((acc, match) => ({ ...acc, match: match[1] }), {});

        videos.forEach((element) => {
            newArr.push(countVideos(element));
        });

        for (let i = 0; i < newArr.length; i++) {
            total.videos += parseInt(newArr[i].match);
        }

        return total.videos;
    });
};

module.exports = {
    getCategories,
    getTime,
    getUrls,
    getVideos,
};
