'use strict';
const mysql= require('mysql')
// TODO Set connectionLimit as an environment variable `RDS_POOL_CONNECTION_LIMIT`.
module.exports = mysql.createConnection({
  connectionLimit: 10,
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DB_NAME
});