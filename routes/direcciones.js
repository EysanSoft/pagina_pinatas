const express = require('express');
const router = express.Router();
const app = express();
const models = require('../models/direccionesDAO');

app.use(express.json());

/* POST metodo registrarDireccion */
router.post('/registrarDireccion', function(req, res, next) {
    const {estado, nombre, direccion, codigoPostal, numeroTelefonico} = req.body
    let idUsuario = req.session.passport.user.id;
    const nuevaDireccion = {estado, nombre, direccion, codigoPostal, numeroTelefonico, idUsuario}
    models.insertDireccion(nuevaDireccion,(data) => {
        res.redirect('/misDirecciones');
    })
});

/* POST metodo eliminarDirecciones */
router.post('/eliminarDireccion', function(req, res, next) {
    const {direccion} = req.body;
    const direccionV = {direccion};
    let direccionV2 = direccionV.direccion;
    console.log(direccionV2);
    models.getDireccionByDireccion(direccionV2,(data) => {
        if(data[0] === undefined) {
            console.log("Valor nulo");
            res.redirect('/misDireccionesError');
        }
        else {
            console.log(data[0].direccion);
            let idUsuario = req.session.passport.user.id;
            if(data[0].idUsuario == idUsuario) {
                console.log("Entro y elimino el dato");
                models.deleteDireccion(direccion,(data) => {
                    res.redirect('/misDirecciones');
                })
            }
            else {
                console.log("Dato de otro usuario")
                res.redirect('/misDireccionesError');
            }
        }
    })
});

/* POST metodo actualizarDirecciones */
router.post('/actualizarDirecciones/:direccion', function(req, res, next) {
    const {estado, nombre, direccion1, codigoPostal, numeroTelefonico} = req.body
    const direccionLlave = req.params.direccion;
    console.log(direccionLlave);
    const direccionSelecta = {estado, nombre, direccion1, codigoPostal, numeroTelefonico, direccionLlave}
    models.updateDireccion(direccionSelecta,(data) => {
        res.redirect('/misDirecciones');
    })
});

module.exports = router;