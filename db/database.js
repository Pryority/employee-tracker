const mysql = require('mysql2');
const dbName = 'employee';
const PORT = process.env.PORT || 3001;

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

);

db.connect(function (err) {
    if (err) throw err;
    // returnAllEmployees();

});

const returnAllEmployees = () => {
    db.query("SELECT * FROM employee", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
};

module.exports = db;