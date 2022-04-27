const express = require('express');
const app = express();
const path = require('path');
// To use partials we have to require hbs module!
const hbs = require('hbs');

const port = process.env.PORT || 8000;
// process.env.PORT is used when we deploy our project

// public directory static path:-
// console.log(path.join(__dirname));
// console.log(path.join(__dirname, '../public'));
const static_path = path.join(__dirname, '../public');
// For static website, we use express static middleware:-
app.use(express.static(static_path));
// By default it shows static html on our home page i.e. '/' page and below also we have given '/' or '' routing but as this comes first hence our static website is displayed!

// Now to show dynamic websites we are using handlebars!
// We have deleted index.html and about.html from public folder and transferred it's contents in index.hbs and about.hbs respectively!
// But to access style.css and images we have to keep that code used to display static website!
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', template_path);
// hbs has register partials to use it and we have to provide path of partials folder also!
hbs.registerPartials(partials_path);

// routing:-
app.get('', (req, res) => {
    // res.send('Welcome to my home page!');
    res.render('index');
});

app.get('/about', (req, res) => {
    // res.send('Welcome to my about us page!');
    res.render('about');
});

app.get('/weather', (req, res) => {
    // res.send('Welcome to my weather page!');
    res.render('weather');
});

app.get('*', (req, res) => {
    // res.send("Oops! 404 error page. This page doesn't exists");
    res.render('404error', {
        errorMsg: 'Opps! Page not found',
    });
});

app.listen(port, () => {
    console.log(`Listening to port number:- ${port}`);
});
