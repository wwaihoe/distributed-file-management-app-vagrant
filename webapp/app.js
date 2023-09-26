const http = require('http');
const fs = require('fs');

const hostname = '10.0.2.15';
const port = 2000;
 
fs.readFile('./index.html', function (err, html) {

    if (err) throw err;    

    const server = http.createServer(function(req, res) {  
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end();  
    });
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
});
