const express = require('express')
const fs = require("fs");
const multer = require('multer')
const sharp = require("sharp")

const app = express()
const path = require('path')
let publicPath = ''
const imgPath = (category) =>
  path.join(__dirname, `../public/img/${category}`);
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },
});

if (process.env.NODE_ENV === "production") {
  publicPath = path.join(__dirname, '..', 'build')
} else {
  publicPath = path.join(__dirname, '..', 'public')
}

app.use(express.static(publicPath))

if (process.env.NODE_ENV === "production") {
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
} else {
  app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000')
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
}
app.get('/test',(req,res) => {
  res.send('test')
})
app.post(
  "/checkout/:category",
  upload.array("checkout", 3),
  async (req, res) => {
    console.log(req.files)
    //find the fileKeys based on the originalName
    const index = req.body.originalName
      .split(",")
      .findIndex((item) => item === req.files[0].originalname);
    //resize and rename by id + fileKeys
    sharp(req.files[0].buffer)
      .resize({
        width: 150,
        height: 150,
        fit: sharp.fit.contain,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .toFile(
        imgPath(req.params.category) +
          "/" +
          req.body.fileKeys.split(",")[index] +
          ".jpg"
      );
    res.send();
  }
);

app.delete(
  "/checkout/delete/:category/:fileName",
  async (req, res) => {
    fs.unlink(
      path.join(imgPath(req.params.category), `${req.params.fileName}`),
      (err) => {
        if (err) throw err;
      }
    );
    res.send();
  }
);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is up.')
})