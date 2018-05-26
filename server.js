const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

const httpPort = process.env.PORT || 3000;

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
  return new Date().getFullYear();
  //return 'test';
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

// projects

app.get('/projects', (req,res) => {
  res.render('project-portfolio.hbs', {
    pageTitle:'projects',
    message: 'listing data ...',
    projects: {
      project1: 'Google',
      project1url: 'www.google.com',
      project2: 'Bing',
      project2url: 'www.bing.com',
      project3: 'Hooli search',
      project3url: 'www.hoolisearch.com'
    }
  });
});

app.get('/bad',  (req,res) => {
  res.send({
    error:1000,
    message:'unable to fulfill request'
  });
});

app.listen(httpPort, () => {
  console.log("Server is up on port " + httpPort);
});
