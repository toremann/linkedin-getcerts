const puppeteer = require('puppeteer');
const connectDB = require('./db/db');
const Certs = require('./db/Schemas/certSchema');

if (process.env.MONGO_URI) {
    connectDB();
} else {
    console.log('Couldnt find MONGO_URI in .env'.red);
    process.exit(1);
}

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const addCert = async (url) => {
    const browser = await puppeteer.launch({ headless: true, args: ['--lang=en-EN,en'] });
    const page = await browser.newPage();

    // Set chromium to english, we can see categories of the course with language set to english (?)
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en',
    });

    console.log('Opening', url);
    await page.goto(url);

    // Wait for page to fully load
    console.log('Getting certificate...\n');
    await timeout(3000);

    const grabCourse = await page.evaluate(() => {
        const courseTitle = document.querySelectorAll('.base-search-card__info h3')[0].innerText;
        return courseTitle;
    });

    const grabAuthor = await page.evaluate(() => {
        const courseAuthor = document.querySelectorAll('.base-search-card__info h4')[0].innerText;
        return courseAuthor.slice(4);
    });

    const grabDate = await page.evaluate(() => {
        const courseDate = document.querySelector('section.core-section-container.my-3.certificate-details__completion-date > div > ul > li > span').innerText;
        return courseDate;
    });

    const grabTime = await page.evaluate(() => {
        const courseTime = document.querySelector('li.certificate-details__content-details-item.certificate-details__content-details-item--content-duration > span').innerText;
        return courseTime;
    });

    const grabVideos = await page.evaluate(() => {
        const courseVideos = document.querySelector(
            'section:nth-child(3) > div > ul > li.certificate-details__content-details-item.certificate-details__content-details-item--videos-count > span'
        ).innerText;
        return courseVideos;
    });

    const grabCategory = await page.evaluate(() => {
        const courseCategory = Array.from(document.querySelectorAll('div.certificate-details__left-rail > section.core-section-container.my-3.course-skills > div > ul > li > a'), (e) => e.innerText);
        return courseCategory;
    });

    const data = {
        author: grabAuthor,
        course: grabCourse,
        date_completed: grabDate,
        url: url,
        time: grabTime,
        videos: grabVideos,
        category: grabCategory,
    };

    Certs.findOneAndUpdate({ url: data.url }, data, { upsert: true, new: true }, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            console.log('Saved to db:\n'.green);
            console.log(`${result}\n`);
        }
    });

    await browser.close();
    process.exit(1);
};

module.exports = addCert;
