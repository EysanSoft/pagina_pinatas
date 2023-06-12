const express = require('express');
const router = express.Router();
const app = express();
const models = require('../models/userDAO');

app.use(express.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST metodo agregarUsuarios */
router.post('/agregarUsuarios', function(req, res, next) {
  const {nombre, apellido, username, password, password2} = req.body
  let administrador = 0;
  const nuevoUsuario = {nombre, apellido, username, password, administrador}
  if(password == password2) {
    models.getUser(username, (data2) => {
      if(data2 != null) {
        res.redirect('/registrarUsuarioError2');
      }
      else {
        models.insertUser(nuevoUsuario,(data) => {
          res.redirect('/login');
        });
      }
    });
  }
  else {
    res.redirect('/registrarUsuarioError');
  }
});

module.exports = router;
