const db = require('../config/database');

module.exports = {

    getUser: (username, callback) => {
        //let sql = `SELECT * FROM user WHERE login=\`` + username + `\``;
        let sql = "SELECT * FROM user WHERE login=" + '"' + username + '"' ;
        db.query(sql, (err, data) => {
            if (err) throw err;
            if (data.length > 0) return callback(data[0]);
            return callback(null);
        });
    },

    findUserById: (idUser, callback) => {
        let sql = 'SELECT * FROM user WHERE id= ?';
        db.query(sql,idUser, (err, data) => {
            if (err) throw err;
            return callback(data[0]);
        });
    },

    getAllUser: (callback) => {
        let sql = 'SELECT * FROM user';
        db.query(sql, (err, data) => {
            if (err) throw err;
            if(data.length > 0) return callback(data);
            return callback(null);
        });
    },

    insertUser: (user, callback) => {
        let nombre = '"' + user.nombre + '"';
        let apellido = '"' + user.apellido + '"';
        let username = '"' + user.username + '"';
        let password = '"' + user.password + '"';
        let administrador = '"' + user.administrador + '"';
        let sql = "insert into user (nombreUsuario,apellidoUsuario,login,password,administrador) values " +
            "(" + nombre + ',' + apellido + ',' + username + ',' + password + ',' + administrador + ")";
        console.log(sql);
        db.query(sql, user, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    updatePassword: (user, callback) => {
        let sql = 'UPDATE user SET password= ? WHERE id= ?';
        db.query(sql, [user.password, user.id], (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    deleteUser: (user, callback) => {
        let sql = 'DELETE FROM user WHERE id= ?';
        db.query(sql, user.id, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    }
}