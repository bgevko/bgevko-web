const mysql = require('mysql2/promise');

// Create a connection pool with the configuration
const pool = mysql.createPool({
    connectionLimit: 100, // Adjust based on your application's needs and DB server's capacity
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB,
});

module.exports.pool = pool;

