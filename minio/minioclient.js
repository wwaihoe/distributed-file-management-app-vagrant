const Minio = require('minio')
const express = require('express')
const multer  = require('multer')

const app = express()
const hostname = '10.0.2.15';
const port = 9000

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

var minioClient = new Minio.Client({
  endPoint: "10.0.2.10",
  port: 9000,
  useSSL: true,
  accessKey: "45EA7152FD462639",
  secretKey: "723A64F84F4435FE63A5FFAB169D2",
})

const bucketName = "myfiles";

minioClient.makeBucket(bucketName, 'us-east-1', function (err) {
    if (err) return console.log(err)
    console.log("Bucket created successfully in 'us-east-1'.")
})

app.post('/upload', multer({storage: multer.memoryStorage()}).single("upload"), (req, res) => {
  minioClient.putObject(bucketName, request.file.originalname, request.file.buffer, (err, etag) => {
    if (err) return res.status(500).send(err);
    res.send(`File uploaded successfully: ${etag}`);
  });
});

app.post('/remove', (req, res) => {
  try {
    minioClient.removeObject(bucketName, req.body);
    res.status(200);    
  } catch (err) {
    res.status(500);  
  }
});

process.on('exit', async function() {
  try {
    await minioClient.removeBucket(bucketName);
    console.log('Bucket removed successfully.');
  } catch (err) {
    console.log('unable to remove bucket.');
  }
});


