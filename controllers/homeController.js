const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const homeController = {
  index: (req, res) => {
    let servicos = [
      { nome: 'Dev Full Stack', imagem: '/imagens/undraw_dev_focus.svg'},
      { nome: 'Marketing Digital', imagem: '/imagens/undraw_social_dashboard.svg'},
      { nome: 'Consultoria UX', imagem: '/imagens/undraw_mobile_apps.svg'}
    ];

    let banners = [
      '/imagens/banner_ux.jpg', 
      '/imagens/full_stack_banner.jpg', 
      '/imagens/banner.jpg'
    ];

    res.render(
      'index', 
      { title: 'Home', listaServicos: servicos, listaBanners: banners }
    );
  },
  contato: (req, res) => {
    let {nome, email, mensagem} = req.body;
    let datetime = new Date().getTime();
    

   let infoContato = {nome, email,  mensagem, datetime};
    
    const fileContatos = path.join('db', "contatos.json");

    let listaContato = {};

    if(fs.existsSync(fileContatos)){
      
      listaContato = JSON.parse(fs.readFileSync(fileContatos, {encoding: 'utf-8'}));
      
      listaContato.push(infoContato);
    } else {
      listaContato = [{
        nome, email, mensagem, datetime
      }];
    }
    listaContato = JSON.stringify(listaContato);
    
    fs.writeFileSync(fileContatos, listaContato);

    res.render('contato', {nome, email, mensagem, title: 'Contato'});
  },

  newsletter: (req, res) => {
    let {emailnewsletter} = req.body;

    const fileNewsLetter = path.join('db', 'newsletter.json');

    let listaNewsLetter = {};

    if(fs.existsSync(fileNewsLetter)){
      //trazendo conteudo do arquivo em formato JSON
      listaNewsLetter = fs.readFileSync(fileNewsLetter, {encoding: 'utf-8'});
      //transformando JSON em obj
      listaNewsLetter = JSON.parse(listaNewsLetter);
      // pegando array de inscritos e adicionando um novo email;
      listaNewsLetter.inscritos.push(emailnewsletter);
    } else {
      listaNewsLetter = {
        inscritos: [emailnewsletter]
      };
      
    }
    // transforma em obj em JSON
    listaNewsLetter = JSON.stringify(listaNewsLetter);
    // guardando a lsita de inscritos com o novo email
    fs.writeFileSync(fileNewsLetter, listaNewsLetter);

    res.render('newsletter', {emailnewsletter, title: "Newsletter"});
  },
  cadastro:(req,res)=>{
    let {nome,email,senha}=req.body;
  
    senha= bcrypt.hashSync(senha,10);
    const fileCadastro = path.join('db','usuarios.json');
    let listaCadastro ={};

    if(fs.existsSync(fileCadastro)){
      listaCadastro = JSON.parse(fs.readFileSync(fileCadastro,{encoding:"UTF-8"}));
      listaCadastro.push(nome,email,senha)
    } else{
      listaCadastro=[{
        nome,email,senha
      }]
    }
listaCadastro=JSON.stringify(listaCadastro);
fs.writeFileSync(fileCadastro,listaCadastro);
res.render('cadastroUsuario', { title: "Cadastro Usuário"});
  }
};

module.exports = homeController;