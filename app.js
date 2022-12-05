
var express = require('express');
var path = require('path');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=> {
  res.render('login');
})

app.get('/home',(req,res)=>{
  res.render('home',{name:req.body.userName});
})

app.get('/search', (req,res)=>{
  res.render('searchpage');
})

app.get('/islands',(req,res) => {
  res.render('islands')
})

app.post('/',(req,res)=>{
  res.render('home',{name:req.body.username});
})

// app.all('*',(req,res)=>{
//   res.status(404).send('page not found 404')
// })

app.listen(5000);



