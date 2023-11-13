const express = require('express');
const mysql = require('mysql2');

const app = express();

// 创建 MySQL 数据库连接池
const db = mysql.createPool({
  host: 'db', // MySQL 容器的名称
  user: 'root', // MySQL root 用户
  password: '11141017', // MySQL root 用户密码
  database: 'ysDB', // 你的数据库名称
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 测试数据库连接
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
    connection.release();
  }
});

// 创建一个路由处理器
app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js server connected to MySQL!');
});

// 启动服务器
const port = process.env.PORT || 8083;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

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