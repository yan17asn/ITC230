const books = [
{ title:'Tom Sawyer',author:'Mark Twain', price:12,inventory:23,},
{ title:'Warcross',author:'Marie Lu', price:25, inventory:5,},
{ title:'Dune',author:'Frank Herbert', price:20, inventory:32,},
{ title:'Sweet Tea',author:'Wendy Lynn Decker', price:14, inventory:37,},
{ title:'Gilchrist',author:'Christian Galacar', price:17, inventory:12, }
];

exports.getAll = ()=>books;

exports.add = (str)=>books.push(str);

exports.get = (a)=>books.find((books)=>books.title == a);

exports.delete = (a)=>{
  const oldlength = books.length;
  for(let i=0; i<books.length; i++) {
    if(books[i].title == a) {
      books.splice(i, 1);
      
    }
    }
    return {deleted: oldlength !== books.length, remain: books.length};
};
    



