const statsSchema = new mongoose.Schema({
    totalTime: Number,
    videosAmount: Number,
    certsAmount: Number,
});

module.exports = mongoose.model('Stats', statsSchema);