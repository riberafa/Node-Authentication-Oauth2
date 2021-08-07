
// todas as rotas de autenticação

const passport = require('passport');
const express = require('express');
const router = express.Router();

//  Auth With Google
// @route  GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] })); //estatégia e escopo (escopo é o que estamos pedindo da requisição info profile)


// Google auth Callback
// @route  GET /auth/google/callback
// nela especificamos as rotas para sucesso de login e error
router.get(
    '/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

// Logout Google
// @route /auth/logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router;