let express = require('express');
let router = express.Router();

let homeController = require('../controllers/homeController');

/* GET home page. */
router.get('/', homeController.index);

router.post('/contato', homeController.contato);

router.post('/newsletter', homeController.newsletter);

module.exports = router;
