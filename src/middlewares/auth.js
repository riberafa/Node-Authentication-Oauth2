//  função para impedir o acesso ao dashboard de pessoas não logadas */
// next é uma função que você chama para executar algo após terminar uma ação
// 

module.exports = {
    ensureAuth: function (req, res, next) { //verifica se está logado
      if (req.isAuthenticated()) { //se estiver logado 
        return next()  //prossegue com as rotas
      } else {
        res.redirect('/')     // redireciona para Login
      }
    },
    ensureGuest: function (req, res, next) {  //garantir que "se estiver logado" ele n veja a rota login
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/dashboard');
      }
    },
  }
  