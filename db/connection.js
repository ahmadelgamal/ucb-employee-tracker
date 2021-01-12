// get the client
const mysql = require('mysql2');
require('dotenv').config();
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: 'employee_tracker'
});

module.exports = connection;