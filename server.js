const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server.log');
    }
  });
  next();
});


// this blocks all subsequential handlers (routes handlers) - unless next() is called
// app.use((req,res,next) => {
//  res.render('maintanance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  //return new Date().getFullYear();
  return 'test';
});

// used in partials/header.hbs on page / with a parram message
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {

  res.render('homepage.hbs', {
    pageTitle: 'About Page',
      message: 'hey dough, how are ya?'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
      message: 'dong!'
  })
});

app.get('/bad',  (req,res) => {
  res.send({
    error:1000,
    message:'unable to fulfill request'
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
