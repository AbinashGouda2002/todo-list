const express = require('express');

//express app
const app = express();

//listen for request
app.listen(3000);

app.get('/', (req, res) => {
  //send method instead of write and end method 
  //res.send('<p>home page</p>');
  res.sendFile('./chapter1Views/index.html', {root: __dirname});
});

app.get('/about', (req, res) => {
    //send method instead of write and end method 
    //res.send('<p>about page</p>');
    res.sendFile('./chapter1Views/about.html', {root: __dirname});
});

//redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

//404 page
app.use((req, res) => {
    res.status(404).sendFile('./chapter1Views/404.html', {root: __dirname});
});