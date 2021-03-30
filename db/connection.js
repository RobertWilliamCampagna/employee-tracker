// get the client
const mysql = require('mysql');
const util = require('util')
 
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpw',
    database: 'employeeTracker_db'
});

connection.connect();
connection.query = util.promisify(connection.query)


  module.exports = connection;