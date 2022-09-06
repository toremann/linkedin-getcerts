const mongoose = require('mongoose');

const certSchema = new mongoose.Schema({
    author: String,
    course: String,
    date_completed: String,
    url: String,
    time: String,
    videos: String,
});

module.exports = mongoose.model('Certs', certSchema);
