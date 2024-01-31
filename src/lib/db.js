const mysql = require('mysql2/promise');

const pool = mysql.createPool({
	connectionLimit: 100,
	host: process.env.SQL_HOST,
	user: process.env.SQL_USER,
	password: process.env.SQL_PASS,
	database: process.env.SQL_DB,
});

pool.getConnection((err, connection) => {
	if (err) {
		console.error("db.js:pool.getConnection:error: ", err);
	}

	if (connection) {
		console.log("db.js:pool.getConnection:success: connected to database");
		connection.release();
	}

	return;
});

module.exports.pool = pool;
