const express = require ('express');
const hbs = require ('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log =  `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log('Unable to appnd to server.log.')
    }
  });

  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();

});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    currentYear: new Date().getFullYear(),
    welcomeMessage:('Welcome to my Node Web App')
  });
  //res.send('<H1>Hello express</H1>');
  // res.send({
  //   name: 'Emmanuel',
  //   like: ['3D printing',
  //            'Sleeping'
  //         ]
  // });
});
app.get('/about', (req, res) =>{
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) =>{
  res.send({
    errorMassage: 'Error Handling request'
  });

});

app.listen(3000, () => {
  console.log('Server is up in port 3000');
});
