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
  res.sendFile(path.join(__dirname, 'public/vin_test.html'));
});

app.get('/vin_v2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/vin_test_v2.html'));
});

app.get('/vin_v3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/vin_test_v3.html'));
});

app.get('/us_mmy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/us_model.html'));
});

app.get('/us_mmy_cp', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/us_model_cp.html'));
});

app.get('/us_mmy_cp2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/us_model_cp2.html'));
});

app.get('/us_mmy_cp3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/us_model_cp3.html'));
});

app.get('/us_mmy_cp4', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/us_model_cp4.html'));
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
      <style>
        body {
          text-align: center;
        }
    
        .outer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
    
        .inner-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 20px;
        }

        .title {
          display: block;
          width: 100%
          text-align: center;
        }
    
        button {
          margin: 5px;
          padding: 10px 20px;
          text-align: center;
          background-color: #ebebeb;
          border: 1px solid #6b6b6b;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
    
        h3 {
          margin-bottom: 5px;
        }
      </style>
      <body>
        <div class="outer-container">
          <h1>Orange</h1>
          <div class="title"><h3>VIN</h3></div>
          <div class="inner-container">
            <button onclick="window.location.href='/vin'">vin_test</button>
            <button onclick="window.location.href='/vin_v2'">vin_test (Method 1)</button>
            <button onclick="window.location.href='/vin_v3'">vin_test (Method 4)</button>
          </div>

          <div class="title"><h3>Data Table Test</h3></div>
          <div class="inner-container">
            <button onclick="window.location.href='/us_mmy_cp'">US_MMY (Method 1)</button>
            <button onclick="window.location.href='/us_mmy_cp2'">US_MMY (Method 2)</button>
            <button onclick="window.location.href='/us_mmy_cp4'">US_MMY (Method 4)</button>
          </div>

          <div class="title"><h3>Data Table</h3></div>
          <div class="inner-container">
            <button onclick="window.location.href='/us_mmy'">US_MMY</button>
            <button onclick="window.location.href='/og_mmy'">OG_MMY</button>
          </div>

          <div class="title"><h3>Data Json</h3></div>
          <div class="inner-container">
            <button onclick="window.location.href='/us_data'">US_Data (JSON)</button>
            <button onclick="window.location.href='/og_data'">OG_Data (JSON)</button>
          </div>
        </div>
      </body>
    </html>
  `;
  res.send(homepageHtml);
});
