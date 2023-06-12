const express = require('express');
const router = express.Router();
const app = express();
const models = require('../models/pagosDAO');

app.use(express.json());

//POST metodo agregarCredito
router.post('/agregarCredito', function(req, res, next) {
    const {numeroDeTarjeta, nombreEnTarjeta, fechaVencimiento} = req.body
    let idUsuario = req.session.passport.user.id;
    const nuevoCredito = {numeroDeTarjeta, nombreEnTarjeta, fechaVencimiento, idUsuario}
    let numTarjetaLength = nuevoCredito.numeroDeTarjeta.toString().length;
    console.log(numTarjetaLength);
    if(numTarjetaLength == 16) {
        models.insertCredito(nuevoCredito,(data) => {
            res.redirect('/misPagos');
        })
    }
    else {
        res.redirect('/registrarCreditoError');
    }
});

/* POST metodo eliminarDirecciones */
router.post('/eliminarCredito', function(req, res, next) {
    const {numPago} = req.body;
    const numeroPago = {numPago};
    let numeroDeTarjeta = numeroPago.numPago;
    console.log(numeroDeTarjeta);
    models.getPedidoByNumTarjeta(numeroDeTarjeta,(data) => {
        if(data[0] === undefined) {
            console.log("Valor nulo");
            res.redirect('/misPagosError');
        }
        else {
            console.log(data[0].numeroDeTarjeta);
            let idUsuario = req.session.passport.user.id;
            if(data[0].idUsuario == idUsuario) {
                console.log("Entro y elimino el dato");
                models.deleteCredito(numeroDeTarjeta,(data) => {
                    res.redirect('/misPagos');
                })
            }
            else {
                console.log("Dato de otro usuario")
                res.redirect('/misPagosError');
            }
        }
    })
});

module.exports = router;