//var books = require('./book.js');
var books = [
{ id:002,title:'tomsawyer', price:12 },
 { id:003,title:'warandeace', price:25 },
 { id:001,title:'dune', price:20 },
 { id:003,title:'war', price:25 }
];


exports.hello = function(){
    console.log('helloworld');
};

exports.getAll = function(){
    return books
    
};

exports.add = function(str){
    books.push(str);
    
};

exports.get = function(a){
    var found = books.find(function(books) {
  return books.title == a;
});
return found;
};

    
exports.delete = function(a){
  for(var i=0; i<books.length; i++) {
    if(books[i].title == a) {
      books.splice(i, 1);
      return true;
    }
    }
};
    



