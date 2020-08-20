const express = require('express');
const app = express();

const port = process.env.PORT || 3000 //THIS IS TO GET THE PORT FROM THE SYSTEM ITS RUNNIGN ON

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