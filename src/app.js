const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000 //THIS IS TO GET THE PORT FROM THE SYSTEM ITS RUNNIGN ON

const publicStaticDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials'); //FOR MULTIPLE VIEWS


app.set('view engine', 'hbs') //LET EXPRESS KNOW THAT THE TEMPLATES ARE COMING FROM HANDLEBARS
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req, res) => {
    res.send("Main page of App");
})

app.get('/weather', (req, res) => {
    res.send("This is weather end point.");
});

app.get("*", (req, res) => {
    res.send("This is not the page you are looking for.")
});



app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})