import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from "path";
import { default as hbs } from 'hbs';
import getWeather from './utils/getWeather.mjs';

const app = express();
const port = process.env.PORT || 3000;


// Define path for express config
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engines and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather_App",
        page: "Weather",
        name: "Naddiya",
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Weather_App",
        page: "Help",
        name: "Naddiya",
        message: "Hello, may I help you ?"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "Weather_App",
        page: "About",
        name: "Naddiya",
    });
});

app.get('/weather', (req, res) => {
    const adress = req.query.adress;
    if (!adress) {
        return res.send({ error: "No location provided, please try again." });
    }
    getWeather(adress, (error, data = {}) => {
        if (error) {
            return res.json(error);
        }
        res.json(data);
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Weather_App",
        page: "404 - Not Found",
        name: "Naddiya",
        message: "Got lost ? Still can go back home"
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "Weather_App",
        page: "404 - No Help Found",
        name: "Naddiya",
        message: "Sorry, No page here"

    });
});

app.listen(port, () => { console.log(`server is up on port: ${port}`); });
