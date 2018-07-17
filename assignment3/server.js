'use strict'
const express = require('express');

const app = express();

/*define view*/
let hbs =  require("express-handlebars");
app.engine(".html", hbs({extname: '.html'}));
app.set("view engine", ".html");

app.set('port',process.env.PORT||3000);
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/views'));
app.use(require('body-parser').urlencoded({extended:true}));
app.use(require('body-parser').json());

const books = require('./books.js');
 
app.get('/', (req, res)=>{
    let list = books.getAll();
    
    res.render('home',{result:list});
});

app.post('/detail', (req,res) => {
 let result = books.get(req.body.title);
 res.render('details', {title: req.body.title, result: result });
});

app.get('/get', (req,res) => {
 let result = books.get(req.query.title);
 res.render('details', {title: req.body.title, result: result });
});




app.get('/delete',(req,res)=>{
    let result = books.delete(req.query.title);
    res.render('delete', {title: req.query.title, result: result});
    
});


app.post('/about',(req,res)=>{
   res.end(req.body.title);
});



app.use((req,res)=>{
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});


app.listen(app.get('port'),()=>{
    console.log('Express started')
});

