const express = require('express');
const router = express.Router();
const passport = require('passport');
const PassportLocal = require('passport-local').Strategy;

const app = express();
const models = require('../models/userDAO');

app.use(express.json());

//Configuracion a Passport
passport.use(new PassportLocal((username,password,done) => {
    models.getUser(username, (data) => {
        console.log(data);
        if(data && password === data.password)
            done(null, data);
        else
            done(null,false);
    });
}));

passport.serializeUser((user,done) => done(null, {id:user.id, name:user.nombreUsuario, lastName:user.apellidoUsuario, admin:user.administrador}));
passport.deserializeUser((user,done) => {
    models.findUserById(user.id, (data) => {
    done(null, data);
    });
});

/*
router.get('/loginError',(req, res) => {
    let message = req.flash('error');
    res.render('login', {title: 'Login', message});
});
 */

/*
router.get('/inicio', (req, res, next) => {
    if (req.isAuthenticated())
        res.render('inicio');
    req.flash('message', 'Es necesario iniciar session.')
    let message = req.flash('message');
    res.render('login', {title: 'login', message });
});
*/

//llamalo loginPassport, para que el formulario lo reconozca, quedaria: login/loginPassport.
router.post('/loginPassport', passport.authenticate('local',
    {
        successRedirect: '/inicio',
        failureRedirect: '/loginError',
        failureFlash: 'Usuario o Contraseña Incorrecta.'
    })
);

module.exports = router;

/*
passport.use(new PassportLocal((username,password,done) => {
    models.getUser(username, (data) => {
        console.log(data);
        if(data)
            if(bcrypt.compareSync(password, data.password))
                return done(null, data);
        return done(null,false, {error: 'Usuario Incorrecto'});
    });
}));
//Passport con bycript, aplicar al final, y ver el metodo de insertar usuario en el video CRUD, (49:00)
 */