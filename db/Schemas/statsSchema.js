const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    totalTime: Number,
    videosAmount: Number,
    certsAmount: Number,
    allCats: Array,
});

module.exports = mongoose.model('Stats', statsSchema);
