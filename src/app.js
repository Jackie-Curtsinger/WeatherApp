const express = require('express'); 
const path = require("path");
const app = express();
const hbs = require('express-handlebars'); //ADDED TO TRY TO FIX
const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 3000 //THIS IS TO GET THE PORT FROM THE SYSTEM ITS RUNNING ON

const publicStaticDirPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

app.engine('.hbs', hbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    })
})


//localhost:3000/weather?address=spokane
app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({ 
            error: "Dude you have to enter and address in the search box for this app to work."
        })
    }
    
    weatherData(address, (error, {temperature, description, cityName} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});


app.get("*", (req, res) => {
    res.render('404', {
        title: "page not found"
    })
})


app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})