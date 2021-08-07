const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieSession = require ('cookie-session');
require('./config/dotenv')();
const exphbs = require('express-handlebars'); //importando os handlebars que mudaram o formato do arquivo para HBS extensão
const morgan = require('morgan'); // quando houver resquest à páginas ele mostra no console.
const passport = require('passport');
// const { use } = require('./routes/index');
require('./config/sequelize'); //configurações do BD

const app = express();
const port = process.env.PORT;
//const cors = require('cors');
//const routes = require('./routes/routes');

//Google auth config - configuração pra acessar a autenticação da estratégia
require('./config/googleStrategy')(passport);

//condição para que o morgan só funcione em development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//configuração do mecanismo de modelo handlebars (modelos prontos)
// Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main',  extname: '.hbs', }))
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));  //pra encontrar a pasta corretamente


app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
}));

// Sessions   - sempre acima do passport middleware
app.use(
  session({
    secret: 'keyboard cat', 
    resave: false,  //não queremos salvar nenhuma sessão se nada foi modificado 
    saveUninitialized: false, // para não criar uma sessão até que algo seja armagenado
  })
)

// Passport Middleware 
// iniciando as sessões e passport
app.use(passport.initialize());
app.use(passport.session());


// Pasta estática pra conter todo css/javascript "global"
app.use(express.static(path.join(__dirname, 'public')));

// Routes 
// separa as rotas de autenticação das demais 
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(routes);

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} app listening at http://localhost:${port} in ${process.env.NODE_ENV}`);
});
    