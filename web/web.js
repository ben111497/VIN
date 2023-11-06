const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const ip = "0.0.0.0"
const port = "8082"


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, ip, () => {
  console.log(`web server run: http://${ip}:${port}`);
});

app.get('/', (req, res) => {
  res.send("Welcome to my web");
}); 

app.get('/vin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});