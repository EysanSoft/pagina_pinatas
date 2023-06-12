const db = require('../config/database');

module.exports = {

    //id user es parte del objeto pedido. para no confundir.
    getDirecciones: (idUser, callback) => {
        let sql = "SELECT * FROM direccion WHERE idUsuario=" + idUser;
        db.query(sql, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    getDireccionByDireccion: (direccion, callback) => {
        let dir = '"' + direccion + '"';
        let sql = "SELECT * FROM direccion WHERE direccion=" + dir;
        db.query(sql, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    insertDireccion: (direccionN, callback) => {
        let estado = '"' + direccionN.estado + '"';
        let nombre = '"' + direccionN.nombre + '"';
        let direccion = '"' + direccionN.direccion + '"';
        let codigoPostal = '"' + direccionN.codigoPostal + '"';
        let numeroTelefonico = '"' + direccionN.numeroTelefonico + '"';
        let idUsuario = '"' + direccionN.idUsuario + '"';
        let sql = "insert into direccion (estado,nombreResidente,direccion,codigoPostal,numeroTelefonico,idUsuario) values " +
            "(" + estado + ',' + nombre + ',' + direccion + ',' + codigoPostal + ',' + numeroTelefonico + ',' + idUsuario + ")";
        console.log(sql);
        db.query(sql, direccionN, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    deleteDireccion: (direccion, callback) => {
        let dir = '"' + direccion + '"';
        let sql = "DELETE FROM direccion WHERE direccion = " + dir;
        db.query(sql, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    updateDireccion: (direccion, callback) => {
        let estado = direccion.estado;
        let nombre = direccion.nombre;
        let direccion1 = direccion.direccion1;
        let codigoPostal = direccion.codigoPostal;
        let numeroTelefonico = direccion.numeroTelefonico;
        let direccionLlave = direccion.direccionLlave;
        let sql = 'UPDATE direccion SET estado=?, nombreResidente=?, direccion=?, codigoPostal=?, numeroTelefonico=?  WHERE direccion=?';
        db.query(sql, [estado, nombre, direccion1, codigoPostal, numeroTelefonico, direccionLlave ], (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    }
}

