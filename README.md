# Linkedin Certification scraper.

As im progressing through Linkedin Learning im getting a few certificates. I want to show these on my own homepage, so I created this nifty scraper.

As you complete courses you will be supplied an URL too ur linkedin certificate:

https://www.linkedin.com/learning/certificates/dfe121da5ff68343d40e9b64edeec6eca89e3f7b83ba458cc0befe4d21cd6f02

simply paste this URL into the scraper and run.

Scraper will get: 
- course name
- author
- completion date
- videos total length
- amount of videos

and send it to ur mongodb db. 

ex: .env file should hold ur mongodb information:

`MONGO_URI=mongodb+srv://user:password@collection.mongodb.net/?retryWrites=true&w=majority`

### Run with node scrape from project folder