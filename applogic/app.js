const http = require('http');
const express = require('express')
const fs = require('fs');

const app = express()
const hostname = "10.0.2.20";
const port = 8000;

const minio_add = "http://10.0.2.25"
const minio_port = "8000"

var fileNames = [];

app.get('/', (req, eres) => {
    res.send("TEST");
});

app.post('/upload', async(req, res) => {
    res.send("TEST");
    var newFile = req.body.get("data");
    //check if filename already exists
    if (fileNames.includes(newFile.name)) {
        res.status(400);
        res.send({message: "File with same name already exists. Please rename the file you want to upload."});
    }
    else {
        try {
            //get presigned url to upload file
            const urlResponse = await fetch(`${minio_add}:${minio_port}/upload?name=${newFile.name}`);
            var uploadURL = response.text();
        } catch(err) {
            console.log(err);
        }
        try {
            //send request to minio server to upload file using presigned url
            const response = await fetch(uploadURL, {
                method: "PUT",
                body: newFile
            });
            res.status = response.status;
            if (response.status === 200) {
                fileNames.push(newFile.name);
            }
        } catch(err) {
            console.log(err);
        } finally {
            res.end();
        }
    }
    
});

app.post('/remove', async(req, res) => {
    //check if file existss in object store
    if (!fileNames.includes(req.body)) {
        res.status(400);
        res.send({message: "File does not exist in object store."})
    }
    else {
        try {
            //send request to minio server to remove file
            const response = await fetch(`${minio_add}:${minio_port}/remove`, {
                method: "POST",
                body: fileName
            });
            res.status = response.status;
        } catch(err) {
            console.log(err);
        } finally {
            res.end();
        }
    }
});

app.post('/download', async(req, res) => {
    //check if file existss in object store
    if (!fileNames.includes(req.body)) {
        res.status(400);
        res.send({message: "File does not exist in object store."})
    }
    else {
        try {
            //send request to minio server to provide download link
            const response = await fetch(`${minio_add}:${minio_port}/download`, {
                method: "POST",
                body: fileName
            });
            res.status = response.status;
            var data = await response.json()
            res.send({url: data.url});
        } catch(err) {
            console.log(err);
        } finally {
            res.end();
        }
    }
})

app.listen(port, hostname, (err) => {
    if (err) return console.log(err);
    console.log("Server running at http://" + hostname + ":" + port + "/");
});