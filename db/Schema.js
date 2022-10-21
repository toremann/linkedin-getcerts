const mongoose = require('mongoose');

const certSchema = new mongoose.Schema({
    author: String,
    course: String,
    date_completed: String,
    url: String,
    time: String,
    videos: String,
    category: [String],
});

module.exports = mongoose.model('Certs', certSchema);

const statsSchema = new mongoose.Schema({
    totalTime: Number,
    videosAmount: Number,
    certsAmount: Number,
});

module.exports = mongoose.model('Certs', statsSchema);
