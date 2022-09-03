const puppeteer = require("puppeteer");
const connectDB = require("./db/db");
const Certs = require("./db/Schema");

connectDB();

// get url's from mongodb

// Promiss all, check if urls have been scraped

const url = 
"https://www.linkedin.com/learning/certificates/1d1e55c5b4f39beac364c4d4ed8f1ce11858d226ce003a26462bdba037c1228f";


(async () => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );

  await page.goto(url);

  const grabCourse = await page.evaluate(() => {
    const courseTitle = document.querySelectorAll(
      ".base-search-card__info h3"
    )[0].innerText;
    return courseTitle;
  });

  const grabAuthor = await page.evaluate(() => {
    const courseAuthor = document.querySelectorAll(
      ".base-search-card__info h4"
    )[0].innerText;
    return courseAuthor.slice(4);
  });

  const grabDate = await page.evaluate(() => {
    const courseDate = document.querySelector(
      "#main-content > section > div.certificate-details__info > div.certificate-details__left-rail > section.core-section-container.my-3.certificate-details__completion-date > div > ul > li > span"
    ).innerText;
    return courseDate;
  });

  const grabTime = await page.evaluate(() => {
    const courseTime = document.querySelector(
      "#main-content > section > div.certificate-details__info > div.certificate-details__left-rail > section:nth-child(3) > div > ul > li.certificate-details__content-details-item.certificate-details__content-details-item--content-duration > span"
    ).innerText;
    return courseTime;
  });

  const grabVideos = await page.evaluate(() => {
    const courseVideos = document.querySelector(
      "#main-content > section > div.certificate-details__info > div.certificate-details__left-rail > section:nth-child(3) > div > ul > li.certificate-details__content-details-item.certificate-details__content-details-item--videos-count > span"
    ).innerText;
    return courseVideos;
  });

  const data = {
    author: grabAuthor,
    course: grabCourse,
    date_completed: grabDate,
    url: url,
    time: grabTime,
    videos: grabVideos
  }

  Certs.findOneAndUpdate(
  { url: data.url },
  data,
  { upsert: true, new: true },
  function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  }
);

  console.log(data);

  await browser.close();
})();

