const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer((req, res) => {

    //creating a file path
    let Path = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    //extension name
    let extname = path.extname(Path)

    //initializing the content type
    let contextType = 'text/html';

    //to check content type and extension
    if (extname == '.js') {
        contextType = 'text/javaScript';
    } else if (extname == '.css') {
        contextType = 'text/css';
    } else if (extname == '.html') {
        contextType = 'text/html';
    } else if (extname == '.json') {
        contextType = 'application/json';
    } else if (extname == '.png') {
        contextType = 'image/png';
    } else if (extname == '.jpg') {
        contextType = 'image/jpg';
    }


    //Read the file
    fs.readFile(Path, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                })

            } else {
                res.writeHead(500);
                res.end(`Server Encountered an Error ${err.code}`)
            }
        } else {
            res.writeHead(200, { 'Content-Type': contextType });
            res.end(content, 'utf8')
        }
    })

})


const PORT = process.env.PORT || 3000;

server.listen(PORT, console.log(`Server is currently running on ${PORT}`));