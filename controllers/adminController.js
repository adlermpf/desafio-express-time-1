const path = require('path');
const fs = require("fs");

const adminController = {
    painel: (req, res) =>{
        const pathNewsletter = path.join('db', 'newsletter.json');
        
        let listaNewsletter = JSON.parse(fs.readFileSync(pathNewsletter, {encoding: "utf-8"}));

        if (req.session.usuario){
        res.render("admin", {listaNewsletter: listaNewsletter.inscritos, title: "Painel Admin"});
        }else {
            res.redirect('login');
        }
    }
}

module.exports = adminController;