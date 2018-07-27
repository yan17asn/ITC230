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

app.use('/api', require('cors')());

//route
// return all records 
app.get('/', (req, res)=>{
    
    Book.find({}, (err, items) => {
       if (err) return next(err);
        res.type('text/html');
       res.render('home',{result:items});
    });
});

//api
app.get('/api/v1/books', (req,res) => {
 
  Book.find({}, (err, result) => {
    if (err) {
    res.json({error:'database connect error'})
    } 
    else
    res.json(result);
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

app.get('/api/v1/book/:title', (req,res) => {
    Book.findOne({'title':req.params.title}, (err, item) => {
       if (item){
            res.json(item);
        }
        else 
            res.json({error:'book not found'});
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

app.get('/api/v1/book/delete/:title', (req,res) => {
    Book.remove({'title':req.params.title}, (err, result) => {
        let deleted = result.n !== 0;
       if (deleted){
            Book.count((err,total)=>{
                res.json({title:req.params.title, result:'deleted',remain:total});
           });            
        }
        else 
            res.json({error:'book not found'});
    });
});

app.post('/api/vi/book/add',(req,res)=>{
    
    Book.create({'title':req.body.title,'author':req.body.author,'price':req.body.price,'inventory':req.body.inventory}, (err, result) => {
        
        let added = result.n !== 0;
       if (added){
             Book.count((err,total)=>{
                res.json({title:req.body.title, result:'deleted',remain:total});
           });     
       }      
        else 
            res.json({error:'book not added'});
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

