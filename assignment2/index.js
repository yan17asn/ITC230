const http = require('http');
const books = require('./books.js');
const querystring = require('querystring');



http.createServer((request, response)=>{

    
    const path = request.url.toLowerCase();
    const newstr = path.substr(5,path.length);
    const arr= newstr.split("=");
    const arr1 = arr[0];
    const arr2 = arr[1];
    const pathr = request.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    
    switch(pathr){
        case '':
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write('Instruction:\n****************************************************\n');
            response.write('*  ADD: /add?title=value&Author=value&price=value  *\n');
            response.write('*  SEARCH: /get?title=value                        *\n');
            response.write('*  DELETE: /delete?title=value                     *\n');
            response.write('****************************************************\n');
            response.write('book-list: \n');
            const outall = books.getAll();
            response.end(JSON.stringify(outall));
            break;
            
        case '/add':
            response.writeHead(200, {'Content-Type': 'text/plain'});
            const arr3 = querystring.parse(newstr);
            books.add(arr3);
            const outadd = books.getAll();
            response.end(JSON.stringify(outadd));
            break;
            
            
        case '/get':
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write('Searching for '+arr2+'\n');
            const outget = books.get(arr2);
            if (typeof(outget) == "object"){ 
            response.end(JSON.stringify(outget));}
            else
            response.end('book not found');
            break;
            
            
        case '/delete':
            response.writeHead(200, {'Content-Type': 'text/plain'});
            const result = books.delete(arr2);
            if(result==true){
            response.write('[book title]: '+arr2+' removed\n')
            const outdel = books.getAll();
            response.end(JSON.stringify(outdel));}
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

