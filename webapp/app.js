const http = require('http');
const cors = require('cors');
const express = require('express')
const app = express()

app.use(cors());

const hostname = '10.0.2.15';
const port = 8000;

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.use(express.static('./public'));
app.use("/public", express.static('./public'));

app.listen(port, hostname, (err) => {
    if (err) return console.log(err);
    console.log("Server running at http://" + hostname + ":" + port + "/");
});