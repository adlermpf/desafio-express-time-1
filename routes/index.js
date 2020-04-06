let express = require('express');
let router = express.Router();
let {check, validationResult, body} = require('express-validator');

let homeController = require('../controllers/homeController');
let adminController = require('../controllers/adminController');
/* GET home page. */
router.get('/', homeController.index);

router.post('/contato', homeController.contato);

router.post('/newsletter', homeController.newsletter);

router.get('/admin', adminController.painel);

router.get('/cadastro',homeController.cadastro);
router.post('/cadastro',homeController.salvar);

router.get('/login',homeController.login);
router.post('/login',[check('email').isEmail().withMessage('Digite um email válido.'), check('senha').isEmpty().withMessage('O campo senha não pode estar em branco.')], homeController.logar);


module.exports = router;
