# Linkedin Certification scraper.

![](https://github.com/toremann/linkedin-getcerts/workflows/prettier/badge.svg)

As im progressing through Linkedin Learning im getting a few certificates. I want to show these on my own homepage, so I created this nifty scraper.

As you complete courses you will be supplied an URL too ur linkedin certificate:

https://www.linkedin.com/learning/certificates/dfe121da5ff68343d40e9b64edeec6eca89e3f7b83ba458cc0befe4d21cd6f02

From project folder run with 'npm start' in terminal and paste in url.

Scraper will get:
- course name
- author
- completion date
- videos total length
- amount of videos

and send it to ur mongodb db. 

Requirements:
- mongodb cloud account and database
- .env file with mongo URI

ex: .env file should hold ur mongodb information:

`MONGO_URI=mongodb+srv://user:password@collection.mongodb.net/?retryWrites=true&w=majority`

- run npm install to get dependencies

### Run with npm start from project folder

#

Additional collectors:

- node .\collectCategories (Creates an array with all course categories)
- node .\collectTime (Gets total time spent on courses)
- node .\collectUrls (Gets all course URL's)
- node .\collectVideos (Gets total amount of videos)

# Stats

Create a collection with stats:

- Array of all categories covered by certification (filtered removes duplicates)
- Array of all certification URL's
- Object containing total time (houres, minutes and seconds)
- Number holding total videos watched

To create stats collection: npm run stats

