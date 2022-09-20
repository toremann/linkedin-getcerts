const puppeteer = require('puppeteer');
const connectDB = require('./db/db');
const Certs = require('./db/Schema');
const readlineSync = require('readline-sync');

// Check for .env file with MONGO_URI before connecting

console.log('\n\nExample: https://www.linkedin.com/learning/certificates/dfc7a36fa80cfebad55937f6f33a15189e4058ere56834f48e708a40b1474319\n');
const url = readlineSync.question('Paste url: ')

if (process.env.MONGO_URI) {
    connectDB();
} else {
    console.log('Couldnt find MONGO_URI in .env');
    process.exit(1);
}

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--lang=en-EN,en']});
    const page = await browser.newPage();

    await page.goto(url);

    // Wait for page to fully load
    await timeout(3000);
    console.log('Waiting for page load');

    const grabCourse = await page.evaluate(() => {
        const courseTitle = document.querySelectorAll('.base-search-card__info h3')[0].innerText;
        return courseTitle;
    });

    const grabAuthor = await page.evaluate(() => {
        const courseAuthor = document.querySelectorAll('.base-search-card__info h4')[0].innerText;
        return courseAuthor.slice(4);
    });

    const grabDate = await page.evaluate(() => {
        const courseDate = document.querySelector(
            '#main-content > section > div.certificate-details__info > div.certificate-details__left-rail > section.core-section-container.my-3.certificate-details__completion-date > div > ul > li > span'
        ).innerText;
        return courseDate;
    });

    const grabTime = await page.evaluate(() => {
        const courseTime = document.querySelector(
            '#main-content > section > div.certificate-details__info > div.certificate-details__left-rail > section:nth-child(3) > div > ul > li.certificate-details__content-details-item.certificate-details__content-details-item--content-duration > span'
        ).innerText;
        return courseTime;
    });

    const grabVideos = await page.evaluate(() => {
        const courseVideos = document.querySelector(
            '#main-content > section > div.certificate-details__info > div.certificate-details__left-rail > section:nth-child(3) > div > ul > li.certificate-details__content-details-item.certificate-details__content-details-item--videos-count > span'
        ).innerText;
        return courseVideos;
    });


    // Loop, expect more than one category
    const grabCategory = await page.evaluate(() => {
        const courseVideos = document.querySelector(
            ' '
        ).innerText;
        return grabCategory;
    });

    const data = {
        author: grabAuthor,
        course: grabCourse,
        date_completed: grabDate,
        url: url,
        time: grabTime,
        videos: grabVideos,
        category: grabCategory
    };

    console.log(data)

    // Certs.findOneAndUpdate({ url: data.url }, data, { upsert: true, new: true }, function (error, result) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Saved to DB:\n', result);
    //     }
    // });

    await browser.close();
    process.exit(1)
})();
