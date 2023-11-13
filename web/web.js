const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const ip = "0.0.0.0";
const port = "8082";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, ip, () => {
  console.log(`web server run: http://${ip}:${port}`);
});

// 在 Express中提供靜態文件服務，讓 html可以讀取其他路徑文件
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send("Welcome to my web");
}); 

app.get('/vin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/us_mmy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/us_model.html'));
});

app.get('/og_mmy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/og_model.html'));
});

app.get('/us_data', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/us_mmy.json'));
});

app.get('/og_data', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/og_mmy.json'));
});

// 新增 /homepage 路由
app.get('/home', (req, res) => {
  const homepageHtml = `
    <html>
      <head>
        <title>Orange</title>
      </head>
      <body>
        <h1>Orange</h1>
        <button onclick="window.location.href='/vin'">vin_test</button>
        <button onclick="window.location.href='/us_mmy'">US_MMY</button>
        <button onclick="window.location.href='/us_data'">US_Data (JSON)</button>
        <button onclick="window.location.href='/og_mmy'">OG_MMY</button>
        <button onclick="window.location.href='/og_data'">OG_Data (JSON)</button>
      </body>
    </html>
  `;
  res.send(homepageHtml);
});
