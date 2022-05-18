const mysql = require('mysql2');
const dbName = 'employee';

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'password',
        database: 'db'
    },
    console.log(`Connected to the ${dbName} database.`)
);

module.exports = db;
