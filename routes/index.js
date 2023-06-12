const express = require('express');
const router = express.Router();
const app = express();
const models1 = require('../models/pedidoDAO');
const models2 = require('../models/direccionesDAO');
const models3 = require('../models/pagosDAO');
const models4 = require('../models/userDAO');

app.use(express.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

//Devuelve la pagina login con mensaje de error
router.get('/loginError',(req, res) => {
  let message = req.flash('error');
  res.render('login', {title: 'Login', message});
});

//metodo get de la pagina inicio
router.get('/inicio', (req, res, next) => {
  models1.getAllPedidos((data1) => {
      console.log(data1);
      models4.getAllUser((data4) => {
          console.log(data4);
          if (req.isAuthenticated()) {
              let nombreUsuario = req.session.passport.user.name;
              let apellidoUsuario = req.session.passport.user.lastName;
              let administrador = req.session.passport.user.admin;
              if(administrador == 1) {
                  res.render('menuAdmin', {nombreUsuario, apellidoUsuario, data1, data4});
                  console.log("Entro");
              }
              else {
                  res.render('inicio', {nombreUsuario, apellidoUsuario});
              }
          }
          req.flash('message', 'Es necesario iniciar session.')
          let message = req.flash('message');
          res.render('login', {title: 'login', message});
      });
  });
});

/* GET registrarUsuarios page. */
router.get('/registrarUsuario', function(req, res, next) {
  res.render('registrarUsuario', { title: 'Registrar Usuario' });
});

/* GET registrarUsuarios page con Error. */
router.get('/registrarUsuarioError', function(req, res, next) {
  req.flash('message', '¡Contraseñas Diferentes! intentelo de nuevo.')
  let message = req.flash('message');
  res.render('registrarUsuario', {title: 'Registrar Usuario', message} );
});

/* GET registrarUsuarios page con Error 2. */
router.get('/registrarUsuarioError2', function(req, res, next) {
    req.flash('message', 'Nombre de usuario ya existente, ingrese otro.')
    let message = req.flash('message');
    res.render('registrarUsuario', {title: 'Registrar Usuario', message} );
});

// GET pagina galeria.
router.get('/galeria', function(req, res, next) {
  let nombreUsuario = req.session.passport.user.name;
  let apellidoUsuario = req.session.passport.user.lastName;
  res.render('galeria', { title: 'Galeria', nombreUsuario, apellidoUsuario});
});

// GET pagina pedidos.
router.get('/pedidos', function(req, res, next) {
  let nombreUsuario = req.session.passport.user.name;
  let apellidoUsuario = req.session.passport.user.lastName;
  let idUsuario = req.session.passport.user.id;
  models2.getDirecciones(idUsuario, (data1) => {
    console.log(data1);
    models3.getCredito(idUsuario, (data2) => {
      console.log(data2);
      res.render('pedidos', { title: 'Pedidos', nombreUsuario, apellidoUsuario, data1, data2});
    });
  });
});

// GET pagina menuUsuarios.
router.get('/menuUsuario', function(req, res, next) {
  let nombreUsuario = req.session.passport.user.name;
  let apellidoUsuario = req.session.passport.user.lastName;
  res.render('menuUsuario', { title: 'Menu de Usuario', nombreUsuario, apellidoUsuario});
});

// GET pagina login, y cerrar session.
router.get('/logout', (req, res, next) => {
  if (req.isAuthenticated())
    req.logout();
  res.render('login', {title: 'login'});
});

// GET pagina misPedidos.
router.get('/misPedidos', function(req, res, next) {
  let idUsuario = req.session.passport.user.id;
  models1.getPedido(idUsuario, (data) => {
    console.log(data);
    res.render('misPedidos', { title: 'Mis Pedidos', data});
  });
});

// GET pagina misPedidos con mensaje de Error.
router.get('/misPedidosError', function(req, res, next) {
  let idUsuario = req.session.passport.user.id;
  req.flash('message', 'ID de pedido invalido.')
  let message = req.flash('message');
  models1.getPedido(idUsuario, (data) => {
    console.log(data);
    res.render('misPedidos', { title: 'Mis Pedidos', data, message});
  });
});

router.post('/actualizarPedido', function(req, res, next) {
  const {IDPedido2} = req.body;
  const idObjeto = {IDPedido2};
  let id = idObjeto.IDPedido2;
  console.log(id);
  models1.getPedidoByID(id,(data) => {
    if(data[0] === undefined) {
      console.log("Valor nulo");
      res.redirect('/misPedidosError');
    }
    else {
      console.log(data[0].id);
      let idUsuario = req.session.passport.user.id;
      if(data[0].idUsuario == idUsuario) {
        let nombrePedido = data[0].nombrePedido;
        let fechaLimite = data[0].fechaLimite;
        let tamano = data[0].tamano;
        let tipo = data[0].tipo;
        let descripcion = data[0].descripcion;
        let id = data[0].id;
        models2.getDirecciones(idUsuario, (data1) => {
          console.log(data1);
          models3.getCredito(idUsuario, (data2) => {
            console.log(data2);
            res.render('actualizarPedido', { title: 'Actualizar Pedidos', nombrePedido, fechaLimite, tamano, tipo, descripcion, id, data1, data2});
          });
        });
      }
      else {
        console.log("Dato de otro usuario")
        res.redirect('/misPedidosError');
      }
    }
  })
});

// GET pagina misDirecciones.
router.get('/misDirecciones', function(req, res, next) {
  let idUsuario = req.session.passport.user.id;
  models2.getDirecciones(idUsuario, (data) => {
    console.log(data);
    res.render('misDirecciones', { title: 'Mis Direcciones', data});
  });
});

// GET pagina registrarDireccion.
router.get('/registrarDireccion', function(req, res, next) {
  res.render('registrarDireccion', { title: 'Registrar Direccion'});
});

// GET pagina misDirecciones con mensaje de Error.
router.get('/misDireccionesError', function(req, res, next) {
  let idUsuario = req.session.passport.user.id;
  req.flash('message', 'La direccion no existe.')
  let message = req.flash('message');
  models2.getDirecciones(idUsuario, (data) => {
    console.log(data);
    res.render('misDirecciones', { title: 'Mis Direcciones', data, message});
  });
});

router.post('/actualizarDireccion', function(req, res, next) {
  const {direccion2} = req.body;
 eccion.direccion2; const direccion = {direccion2};
    let direct = dir
  console.log(direct);
  models2.getDireccionByDireccion(direct,(data) => {
    if(data[0] === undefined) {
      console.log("Valor nulo");
      res.redirect('/misDireccionesError');
    }
    else {
      console.log(data[0].direccion);
      let idUsuario = req.session.passport.user.id;
      if(data[0].idUsuario == idUsuario) {
        let estado = data[0].estado;
        let nombreResidente = data[0].nombreResidente;
        let direccion = data[0].direccion;
        let codigoPostal = data[0].codigoPostal;
        let numeroTelefonico = data[0].numeroTelefonico;
        res.render('actualizarDireccion', { title: 'Actualizar Pedidos', estado, nombreResidente, direccion, codigoPostal, numeroTelefonico});
      }
      else {
        console.log("Dato de otro usuario")
        res.redirect('/misDireccionesError');
      }
    }
  })
});

// GET pagina misPagos.
router.get('/misPagos', function(req, res, next) {
  let idUsuario = req.session.passport.user.id;
  models3.getCredito(idUsuario, (data) => {
    console.log(data);
    res.render('misPagos', { title: 'Mis Pagos', data});
  });
});

// GET pagina registrarCredito.
router.get('/registrarCredito', function(req, res, next) {
  res.render('registrarCredito', { title: 'Registrar Credito'});
});

// GET pagina registrarCredito con mensaje de error.
router.get('/registrarCreditoError', function(req, res, next) {
  req.flash('message', 'Tarjeta de credito invalida.')
  let message = req.flash('message');
  res.render('registrarCredito', { title: 'Registrar Credito', message});
});

// GET pagina misPagos con mensaje de Error.
router.get('/misPagosError', function(req, res, next) {
  let idUsuario = req.session.passport.user.id;
  req.flash('message', 'Tarjeta de credito invalida.')
  let message = req.flash('message');
  models3.getCredito(idUsuario, (data) => {
    console.log(data);
    res.render('misPagos', { title: 'Mis Pagos', data, message});
  });
});

router.post('/detallesPedido', function(req, res, next) {
    const {idPedido} = req.body;
    const idObjeto = {idPedido};
    let id = idObjeto.idPedido;
    models1.getPedidoByID(id,(data1) => {
        if(data1[0] === undefined) {
            console.log("Valor nulo");
            res.redirect('/inicio');
        }
        else {
            models2.getDireccionByDireccion(data1[0].direccion,(data2) => {
                models3.getPedidoByNumTarjeta(data1[0].numeroDeTarjeta,(data3) => {
                    models4.findUserById(data1[0].idUsuario,(data4) => {
                        let id = data1[0].id;
                        console.log(data1);
                        console.log(data2);
                        console.log(data3);
                        console.log(data4);
                        res.render('detallesPedido', { title: 'Detalles del Pedido', data1, data2, data3, data4, id});
                    })
                })
            })
        }
    })
});

module.exports = router;