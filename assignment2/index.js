var http = require('http');
var books = require('./books.js');
const querystring = require('querystring');



http.createServer(function (request, response) {

    
    var path = request.url.toLowerCase();
    var newstr = path.substr(5,path.length);
    var arr= newstr.split("=");
    var arr1 = arr[0];
    var arr2 = arr[1];
    var pathr = request.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    
    switch(pathr){
        case '':
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write('Instruction:\n****************************************************\n');
            response.write('*  ADD: /add?title=value&Author=value&price=value  *\n');
            response.write('*  SEARCH: /get?title=value                        *\n');
            response.write('*  DELETE: /delete?title=value                     *\n');
            response.write('****************************************************\n');
            response.write('book-list: \n');
            var outall = books.getAll();
            response.end(JSON.stringify(outall));
            break;
            
        case '/add':
            response.writeHead(200, {'Content-Type': 'text/plain'});
            var arr3 = querystring.parse(newstr);
            books.add(arr3);
            var outall = books.getAll();
            response.end(JSON.stringify(outall));
            break;
            
            
        case '/get':
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write('Searching for '+arr2+'\n');
            var out = books.get(arr2);
            if (typeof(out) == "object"){ 
            response.end(JSON.stringify(out));}
            else
            response.end('book not found');
            break;
            
            
        case '/delete':
            response.writeHead(200, {'Content-Type': 'text/plain'});
            var result = books.delete(arr2);
            if(result==true){
            response.write('[book title]: '+arr2+' removed\n')
            var outall = books.getAll();
            response.end(JSON.stringify(outall));}
            else
            response.end('book not found\n [book title]: '+arr2+' not removed');
            break;
            
default:
            response.writeHead(404, { 'Content-Type': 'text/plain' });
                        response.end('Not Found');
                        break;
    }
}).listen(3000);


console.log('Server running at http://127.0.0.1:3000/');

