const express = require('express');
const generateStats = require('./stats');
const addCert = require('./getCertification');
const path = require('path');

const app = express();
app.use(express.json());

// Serve static files (e.g., CSS, JavaScript, images) from a "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to render the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/stats', async (req, res) => {
    try {
        const statsData = await generateStats();

        res.json(statsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching stats.' });
    }
});

app.post('/stats', async (req, res) => {
    try {
        console.log(req.body);
        const url = req.body.url;
        const formattedUrl = url.replace(/\?(.*)/, '');
        console.log('formattedUrl', formattedUrl);
        console.log('url', url);

        await addCert(formattedUrl);

        // Send a success response
        res.status(200).json({ message: 'URL received and processed successfully.' });
    } catch (error) {
        // Handle errors gracefully and send an error response
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the URL.' });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
