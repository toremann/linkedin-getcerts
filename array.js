const connectDB = require("./db/db");
const Certs = require("./db/Schema");

connectDB();


const data = 
    {
      author: 'Morten Rand-Hendriksen',
      course: 'HTTP Essential Training',
      date_completed: '31. august 2022',
      url: 'https://www.linkedin.com/learning/certificates/dfe121da5ff68343d40e9b64edeec6eca89e3f7b83ba458cc0befe4d21cd6f02'
    }
  

  Certs.findOneAndUpdate(
  { url: data.url },
  data,
  { upsert: true, new: true },
  function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log("Saved to db:", data);
    }
  }
);
