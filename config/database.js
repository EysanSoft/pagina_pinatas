const mysql = require('mysql');

const config ={
    host    : 'localhost',
    user    : 'root',
    password: '081601',
    database: 'paginapinatasCRUD'
};
const con = mysql.createConnection(config);
con.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});

module.exports = con;