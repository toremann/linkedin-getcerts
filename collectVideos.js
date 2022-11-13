const connectDB = require('./db/db');
const Certs = require('./db/certSchema');

if (process.env.MONGO_URI) {
    connectDB();
} else {
    console.log('Couldnt find MONGO_URI in .env'.red);
    process.exit(1);
}

(async () => {
    Certs.find({}, function (err, res) {
        let videos = [];

        res.forEach(function (cert) {
            videos.push(cert.videos);
        });

        console.log(videos);
        console.log('total videos:', videos.length);

        const newArr = [];

        let total = { videos: 0 };

        const countVideos = (video) => [...video.matchAll(/(\d+)/g)].reduce((acc, match) => ({ ...acc, match: match[1] }), {});

        videos.forEach((element) => {
            newArr.push(countVideos(element));
        });

        for (let i = 0; i < newArr.length; i++) {
            total.videos += parseInt(newArr[i].match);
        }

        console.log('total videos', total);

        process.exit(1);
    });
})();
