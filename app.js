const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 4000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files like CSS
app.use(express.static('public'));

// Parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Route for the home page
app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});

// Route to handle form submissions
app.post('/', async (req, res) => {
    const city = req.body.city;
    const apiKey = process.env.API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;
        const weather = `It's ${weatherData.main.temp}°C in ${weatherData.name}.`;
        res.render('index', { weather, error: null });
    } catch (error) {
        res.render('index', { weather: null, error: 'City not found. Please try again.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});