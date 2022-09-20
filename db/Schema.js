const mongoose = require('mongoose');

const certSchema = new mongoose.Schema({
    author: String,
    course: String,
    date_completed: String,
    url: String,
    time: String,
    videos: String,
    category: [String] /* Maybe array? */,
});

module.exports = mongoose.model('Certs', certSchema);
