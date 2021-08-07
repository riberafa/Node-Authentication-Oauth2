// todas as rotas [páginas] não protegidas 

const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middlewares/auth');

const Story = require('../models/Story');

// Login/Landing page
// @route  GET/
//está com a middleware ensureGuest
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login', //utilizando a estilização padrão login
    });  
});

// Dashboard
// @route  GET/dashboard
// está com a middleware ensureAuth 
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard', {
        name: req.user.firstName,
    });
});


module.exports = router;






