const path = require('path');
const fs = require("fs");

const adminController = {
    painel: (req, res) =>{
        const pathNewsletter = path.join('db', 'newsletter.json');
        
        let listaNewsletter = JSON.parse(fs.readFileSync(pathNewsletter, {encoding: "utf-8"}));

        res.render("admin", {listaNewsletter: listaNewsletter.inscritos, title: "Painel Admin"});
    }
}

module.exports = adminController;