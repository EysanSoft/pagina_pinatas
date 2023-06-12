const db = require('../config/database');

module.exports = {

    //id user es parte del objeto pedido. para no confundir.
    getPedido: (idUser, callback) => {
        let sql = "SELECT * FROM pedido WHERE idUsuario=" + idUser;
        db.query(sql, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    getPedidoByID: (id, callback) => {
        let sql = "SELECT * FROM pedido WHERE id=" + id;
        db.query(sql, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    getAllPedidos: (callback) => {
        let sql = 'SELECT * FROM pedido';
        db.query(sql, (err, data) => {
            if (err) throw err;
            if(data.length > 0) return callback(data);
            return callback(null);
        });
    },

    insertPedido: (pedido, callback) => {
        let nombrePedido = '"' + pedido.nombrePedido + '"';
        let fechaLimite = '"' + pedido.fechaLimite + '"';
        let tamano = '"' + pedido.tamano + '"';
        let tipo = '"' + pedido.tipo + '"';
        let descripcion = '"' + pedido.descripcion + '"';
        let direccion = '"' + pedido.direccion + '"';
        let credito = '"' + pedido.credito + '"';
        let estadoActual = '"' + pedido.estadoActual + '"';
        let idUsuario = '"' + pedido.idUsuario + '"';
        let sql = "insert into pedido (nombrePedido,fechaLimite,tamano,tipo,descripcion,direccion,numeroDeTarjeta,estadoActual,idUsuario) values " +
            "(" + nombrePedido + ',' + fechaLimite + ',' + tamano + ',' + tipo + ',' + descripcion + ',' + direccion + ',' + credito + ',' + estadoActual + ',' + idUsuario + ")";
        console.log(sql);
        db.query(sql, pedido, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    updatePedido: (pedido, callback) => {
        let nombrePedido = pedido.nombrePedido;
        let fechaLimite = pedido.fechaLimite;
        let tamano = pedido.tamano;
        let tipo = pedido.tipo;
        let descripcion = pedido.descripcion;
        let direccion = pedido.direccion;
        let credito = pedido.credito;
        let id = pedido.id;
        let sql = 'UPDATE pedido SET nombrePedido=?, fechaLimite=?, tamano=?, tipo=?, descripcion=?, direccion=?, numeroDeTarjeta=? WHERE id=?';
        db.query(sql, [nombrePedido, fechaLimite, tamano, tipo, descripcion, direccion, credito,  id], (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    updateEstado: (estadoID, callback) => {
        let estado = estadoID.estadoNuevo;
        let id = estadoID.id;
        let sql = 'UPDATE pedido SET estadoActual=?  WHERE id=?';
        db.query(sql, [estado,  id], (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    },

    deletePedido: (id, callback) => {
        let sql = 'DELETE FROM pedido WHERE id= ' + id;
        db.query(sql, (err, data) => {
            if (err) throw err;
            return callback(data);
        });
    }
}