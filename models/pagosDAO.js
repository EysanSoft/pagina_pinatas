const db = require('../config/database');

module.exports = {

    //id user es parte del objeto pedido. para no confundir.
    getCredito: (idUser, callback) => {
        let sql = "SELECT * FROM credito WHERE idUsuario=" + idUser;
        db.query(sql, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    getPedidoByNumTarjeta: (numeroDeTarjeta, callback) => {
        let sql = "SELECT * FROM credito WHERE numeroDeTarjeta=" + numeroDeTarjeta;
        db.query(sql, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    insertCredito: (credito, callback) => {
        let numeroDeTarjeta = '"' + credito.numeroDeTarjeta + '"';
        let nombreEnTarjeta = '"' + credito.nombreEnTarjeta + '"';
        let fechaVencimiento = '"' + credito.fechaVencimiento + '"';
        let idUsuario = '"' + credito.idUsuario + '"';
        let sql = "insert into credito (numeroDeTarjeta,nombreEnTarjeta,fechaVencimiento,idUsuario) values " +
            "(" + numeroDeTarjeta + ',' + nombreEnTarjeta + ',' + fechaVencimiento + ',' + idUsuario + ")";
        console.log(sql);
        db.query(sql, credito, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    deleteCredito: (numeroDeTarjeta, callback) => {
        let sql = "DELETE FROM credito WHERE numeroDeTarjeta = " + numeroDeTarjeta;
        db.query(sql, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },
}
