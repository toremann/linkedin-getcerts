const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    totalTime: Object,
    totalVideos: Number,
    allCats: Array,
    allUrl: Array,
    authorCourses: Array,
});

module.exports = mongoose.model('Stats', statsSchema);
