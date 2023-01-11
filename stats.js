// Generate stats from DB
// Will currently get:
// Total time spent watching
// Total amount of videos watched
// Total of learning categories (removes duplicates)
// URL's for all certifications completed

const connectDB = require('./db/db');
const Stats = require('./db/Schemas/statsSchema');
const { getCategories, getTime, getUrls, getVideos } = require('./helpers/collectors');

connectDB().then(async () => {
    const url = await getUrls();
    const cats = await getCategories();
    const time = await getTime();
    const videos = await getVideos();

    const data = {
        totalTime: time, // totale time spent learning
        totalVideos: videos, // total amount of videos watched
        allCats: cats, // total categories watched
        allUrl: url, // collection of all certificates
    };

    Stats.findOneAndUpdate({}, data, { upsert: true, new: true }, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            console.log('Saved to db:\n'.green);
            console.log(`${result}\n`);
        }
    });
});
