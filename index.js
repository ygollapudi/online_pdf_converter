var docxConverter = require("docx-pdf");
const express = require("express");
const multer = require("multer");
 
var path = require("path");
 
const bodyparser = require("body-parser");
 
const app = express();
 
app.use(express.static("uploads"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
 
var upload = multer({ storage: storage });
 
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
 
app.post("/docxtopdf", upload.single("file"), (req, res) => {
  let outputpath = Date.now() + "output.pdf";
  docxConverter(req.file.path, outputpath, function (err, result) {
    if (err) {
      console.log(err);
    }
    res.download(outputpath,() => {
 
    })
  });
});
 
app.listen(3000, () => {
  console.log("App is listening on port 3000");
});