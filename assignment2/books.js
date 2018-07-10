const books = [
{ title:'tomsawyer',author:'mark twain', price:12,inventory:23,},
{ title:'warcross',author:'marie lu', price:25, inventory:5,},
{ title:'dune',author:'frank herbert', price:20, inventory:32,},
{ title:'sweettea',author:'wendy lynn decker', price:14, inventory:37,},
{ title:'gilchrist',author:'christian galacar', price:17, inventory:12, }
];

exports.getAll = ()=>books;

exports.add = (str)=>books.push(str);

exports.get = (a)=>books.find((books)=>books.title == a);

exports.delete = (a)=>{
  for(let i=0; i<books.length; i++) {
    if(books[i].title == a) {
      books.splice(i, 1);
      return true;
    }
    }
};
    



