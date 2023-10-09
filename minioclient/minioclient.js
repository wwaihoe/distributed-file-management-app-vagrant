const Minio = require("minio");
const express = require("express");

const app = express();
const hostname = "10.0.2.25";
const port = 8000;


var minioClient = new Minio.Client({
  endPoint: "play.min.io",
  port: 9000,
  useSSL: true,
  accessKey: "minioadmin",
  secretKey: "minioadmin",
});

const bucketName = "myfiles";

minioClient.makeBucket(bucketName, "us-east-1", function (err) {
  if (err) return console.log(err);
  console.log("Bucket created successfully in 'us-east-1'.");
});

app.get("/upload", (req, res) => {
  client.presignedPutObject(bucketName, req.query.name, function(err, url) {
      if (err) throw err;
      res.send(url);
  })
});

app.post("/remove", (req, res) => {
  try {
    minioClient.removeObject(bucketName, req.body);
    res.status(200);
  } catch (err) {
    res.status(500);
  } finally {
    res.end();
  }
});

app.post("/download", (req, res) => {
  try {
    minioClient.presignedGetObject(bucketName, req.body, 5 * 60 * 60, function (err, presignedUrl) {
      if (err) return console.log(err)
      res.send({url: presignedUrl});
    })
    res.status(200);
  } catch (err) {
    res.status(500);
  } finally {
    res.end();
  }
});

process.on("exit", () => {
  try {
    minioClient.removeBucket(bucketName);
    console.log("Bucket removed successfully.");
  } catch (err) {
    console.log("unable to remove bucket.");
  }
});


app.listen(port, hostname, (err) => {
  if (err) return console.log(err);
  console.log("Server running at http://" + hostname + ":" + port + "/");
});
