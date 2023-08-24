# Linkedin Certification scraper.

![](https://github.com/toremann/linkedin-getcerts/workflows/prettier/badge.svg)

As im progressing through Linkedin Learning im getting a few certificates. I want to show these on my own homepage, so I created this nifty scraper.

As you complete courses you will be supplied an URL too ur linkedin certificate:

https://www.linkedin.com/learning/certificates/dfe121da5ff68343d40e9b64edeec6eca89e3f7b83ba458cc0befe4d21cd6f02?u=12345678

- First run npm install to get dependencies
- Create a mongodb local or on atlas (https://www.mongodb.com/)
- Create a .env file with mongodb credentials (see .env.example)

ex: .env file should hold ur mongodb information:

`MONGO_URI=mongodb+srv://user:password@collection.mongodb.net/?retryWrites=true&w=majority`

From project folder run with 'npm start' and goto http://localhost:3000

![alt text](/frontend.png)

When you submit your certification url the scraper will get:

- course name
- author
- completion date
- videos total length
- amount of videos

and store it to ur mongodb db. 

# Api

GET /stats
Retrives all certification data from db

```
const data = {
    totalTime: time, // total time spent learning
    totalVideos: videos, // total number of videos watched
    allCats: cats, // total categories watched
    allUrl: url, // collection of all certificates
    authorCourses: authorAndCourses, // collection of authors and courses
 };
```

POST /stats
Takes an certification url

```
{
    "url": "https://www.linkedin.com/learning/certificates/12345ed1b0a1c123aebcafea123453af5ff8d531671cd6bfe709326cd7033ce7?u=12345567"
}
```

