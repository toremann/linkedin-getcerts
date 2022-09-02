const puppeteer = require("puppeteer");
const connectDB = require("./db/db");
const Certs = require("./db/Schema");

connectDB();

// get url's from mongodb

// Promiss all, check if urls have been scraped

(async () => {
  const url =
    "https://www.linkedin.com/learning/certificates/dfe121da5ff68343d40e9b64edeec6eca89e3f7b83ba458cc0befe4d21cd6f02";

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

  let data = {
    author: grabAuthor,
    course: grabCourse,
    date_completed: grabDate,
    url: url,
  };

  // Certs.findOneAndUpdate(
  //   { url: data[0].url },
  //   data,
  //   { upsert: true, new: true },
  //   function (error, result) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("Saved to db:", data);
  //     }
  //   }
  // );

  console.log(data);

  // await browser.close();
})();
