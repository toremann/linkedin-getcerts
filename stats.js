// Generate stats from DB
// Will currently get:
// Total time spent watching
// Total amount of videos watched
// Total of learning categories (removes duplicates)
// URL's for all certifications completed

const connectDB = require('./db/db');
const Stats = require('./db/Schemas/statsSchema');
const { getCategories, getTime, getUrls, getVideos, getAuthorAndCourses } = require('./helpers/collectors');

const generateStats = async () => {
    try {
        await connectDB(); // Connect to the database

        const url = await getUrls();
        const cats = await getCategories();
        const time = await getTime();
        const videos = await getVideos();
        const authorAndCourses = await getAuthorAndCourses();

        const data = {
            totalTime: time, // total time spent learning
            totalVideos: videos, // total number of videos watched
            allCats: cats, // total categories watched
            allUrl: url, // collection of all certificates
            authorCourses: authorAndCourses, // collection of authors and courses
        };

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = generateStats;
