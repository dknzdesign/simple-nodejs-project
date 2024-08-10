const express = require('express');
const axios = require('axios');
const app = express();

// Use EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// API endpoint to fetch data from
const API_URL = 'https://rickandmortyapi.com/api/character';

// Route for the main page
app.get('/', async (req, res) => {
    // Get the current page from the query, default to 1
    const page = parseInt(req.query.page) || 1;

    try {
        // Fetch data from the API
        const response = await axios.get(`${API_URL}?page=${page}`);
        const characters = response.data.results;
        const totalPages = response.data.info.pages;

        // Render the data in the index.ejs template
        res.render('index', {
            characters: characters,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        res.status(500).send('Error fetching data from API');
    }

});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});