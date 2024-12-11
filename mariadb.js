// db.js
const mysql = require('mysql2');

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Youtube',
});

// 연결 확인
connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

module.exports = connection;