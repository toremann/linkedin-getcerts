const connectDB = require('./db/db');
const Stats = require('./db/Schemas/statsSchema');
const { getCategories, getTime, getUrls, getVideos } = require('./helpers/collectors');

connectDB().then(async () => {
    const url = await getUrls();
    const cats = await getCategories();
    const time = await getTime();
    const videos = await getVideos();

    const response = {
        allUrl: url,
        cats: cats,
        time: time,
        videos: videos
    };

    console.log(response);
});
