// get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'BobbieBullet2!',
    database: 'employeeTracker_db'
});
connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    // afterConnection();
  });


  module.exports = connection;