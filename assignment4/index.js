'use strict'
const express = require('express');

const app = express();
const Book = require('./models/book');

/*define view*/
let hbs =  require("express-handlebars");
app.engine(".html", hbs({extname: '.html'}));
app.set("view engine", ".html");

app.set('port',process.env.PORT||3000);
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/views'));
app.use(require('body-parser').urlencoded({extended:true}));
app.use(require('body-parser').json());


// return all records 
app.get('/', (req, res)=>{
    
    Book.find({}, (err, items) => {
       if (err) return next(err);
        res.type('text/html');
       res.render('home',{result:items});
    });
});

// search one record's detail from user input
app.post('/detail', (req,res) => {
    Book.findOne({'title':req.body.title}, (err, item) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {title: req.body.title, result: item });
        });
});

// search one record's detail onclick
app.get('/get', (req,res) => {
    Book.findOne({'title':req.query.title}, (err, item) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {title: req.body.title, result: item });
        });
});

// delete current record
app.get('/delete',(req,res)=>{
    Book.remove({'title':req.query.title}, (err, result) => {
        if (err) return next(err);
        let deleted = result.n !== 0;
        
        Book.count((err, total) => {
            res.type('text/html');
            res.render('delete', {title: req.query.title,deleted:deleted , remain: total });    
        });
    });
    
});

//add record
app.post('/add',(req,res)=>{
    
    Book.create({'title':req.body.title,'author':req.body.author,'price':req.body.price,'inventory':req.body.inventory}, (err, result) => {
        if (err) console.log(err);
        
       Book.find({}, (err, items) => {
       if (err) return next(err);
        res.type('text/html');
       res.render('home',{result:items});
       });
    });
});
    



app.post('/about',(req,res)=>{
   res.type('text/plain');
   res.end('about');
});



app.use((req,res)=>{
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});


app.listen(app.get('port'),()=>{
    console.log('Express started')
});

