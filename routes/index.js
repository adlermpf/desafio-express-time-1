let express = require('express');
let router = express.Router();

let homeController = require('../controllers/homeController');
let adminController = require('../controllers/adminController');
/* GET home page. */
router.get('/', homeController.index);

router.post('/contato', homeController.contato);

router.post('/newsletter', homeController.newsletter);

router.get('/admin', adminController.painel);

router.get('/cadastro',homeController.cadastro);
router.post('/cadastro',homeController.cadastro);

module.exports = router;
