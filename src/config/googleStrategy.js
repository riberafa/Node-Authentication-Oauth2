const GoogleStrategy = require('passport-google-oauth20').Strategy;
const sqlite3 = require('sqlite3');
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID, //pegando .env
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => { //~pegaremos da requisição
          
          
          const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
          }

          await User.findOne({ where: {googleId: profile.id} }).then((currentUser) => {

            if (currentUser){
              //verifica se já existe
              console.log("o usuário é:" , currentUser);
              done(null, currentUser);
            }

            else (User.create(newUser)).then((newUser) => {
              console.log("usuário criado.", newUser);
              done(null, newUser);
            });
          })
        }
      )
    )

    
    // para conseguir salvar os dados e iniciar na sessão e retirar e encerrar
    passport.serializeUser((user, done) => { 
      done(null, user.id)
    })
  
    passport.deserializeUser((id, done) => {
      User.findByPk(id).then((user) => {
        done(null, user);
      });
    });
}
  
