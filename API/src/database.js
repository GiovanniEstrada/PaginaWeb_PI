const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'ingenieria',
    database: 'practicasI',
    multipleStatements: true
});

mysqlConnection.connect(function (err){
    if (err){
        console.error(err);
        return;
    } else {
        console.log('DataBase is connected');
    }
});

module.exports = mysqlConnection;