const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'MMY_US_listC_V0.6_231013.db');
const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8081;
app.listen(port, () => {
  console.log(`SQL server run: http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send("Welcome to my SQLite API");
  }); 

const db = new sqlite3.Database('MMY_US_listC_V0.6_231013.db', (err) => {
  if (err) {
    console.error('connect failed:', err.message);
  } else {
    console.log('connected');
  }
});

app.get('/ip', async (req, res) => {
  try {
    const ngrokUrl = await ngrok.connect({
      addr: port,
    });
    res.json({ ngrokIP: ngrokUrl });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve NGROK IP' });
  }
});

app.use('/vin', express.static(path.join(__dirname, 'public')));

app.post('/exec', (req, res) => {
    const { sql } = req.body;

    db.run(`${sql}`, function(err) {
        if (err) {
            console.error('failed:', err.message);
            res.status(500).json({ message: 'failed' });
            return;
        }
        res.status(200).json({ message: 'success' });
    });
});

app.post('/query', (req, res) => {
    console.log(JSON.stringify(req.body))
    const data = req.body.data;
    let resList = []

    for (let i = 0; i < data.length; i++) {
        db.all(`${data[i].sql}`, (err, rows) => {
            console.log(`---------${i}---------`)
            console.log(data[i].vin)
            console.log(err)
            console.log(rows)
            if (err) {
                console.error(err.message);
                res.status(500).json({ data: [], message: '${err.message}' });
            } else {
                resList.push({ vin: data[i].vin, data: rows})
                if (resList.length === data.length) {
                    res.status(200).json({ data: resList, message: 'success' });
                }
            }
        });
    }  
});