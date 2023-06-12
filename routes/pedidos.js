const express = require('express');
const router = express.Router();
const app = express();
const models = require('../models/pedidoDAO');

app.use(express.json());

/* POST metodo agregarPedidos */
router.post('/agregarPedidos', function(req, res, next) {
    const {nombrePedido, fechaLimite, tamano, tipo, descripcion, direccion, credito} = req.body
    let estadoActual = 'En Espera';
    let idUsuario = req.session.passport.user.id;
    const nuevoPedido = {nombrePedido, fechaLimite, tamano, tipo, descripcion, direccion, credito, estadoActual, idUsuario}
    models.insertPedido(nuevoPedido,(data) => {
        res.redirect('/pedidos');
    })
});

/* POST metodo eliminarPedidos */
router.post('/eliminarPedido', function(req, res, next) {
    const {IDPedido} = req.body;
    const idObjeto = {IDPedido};
    let id = idObjeto.IDPedido;
    console.log(id);
    models.getPedidoByID(id,(data) => {
        if(data[0] === undefined) {
            console.log("Valor nulo");
            res.redirect('/misPedidosError');
        }
        else {
            console.log(data[0].id);
            let idUsuario = req.session.passport.user.id;
            if(data[0].idUsuario == idUsuario) {
                console.log("Entro y elimino el dato");
                models.deletePedido(id,(data) => {
                    res.redirect('/misPedidos');
                })
            }
            else {
                console.log("Dato de otro usuario")
                res.redirect('/misPedidosError');
            }
        }
    })
});

/* POST metodo actualizarPedidos */
router.post('/actualizarPedidos/:id', function(req, res, next) {
    const {nombrePedido, fechaLimite, tamano, tipo, descripcion, direccion, credito} = req.body
    const id = req.params.id;
    console.log(id);
    const pedidoSelecto = {nombrePedido, fechaLimite, tamano, tipo, descripcion, direccion, credito, id}
    models.updatePedido(pedidoSelecto,(data) => {
        res.redirect('/misPedidos');
    })
});

/* POST metodo actualizarEstado */
router.post('/actualizarEstado/:id', function(req, res, next) {
    const {estadoNuevo} = req.body
    const id = req.params.id;
    console.log(estadoNuevo);
    console.log(id);
    const estadoID = {estadoNuevo, id}
    models.updateEstado(estadoID,(data) => {
        res.redirect('/inicio');
    })
});

module.exports = router;