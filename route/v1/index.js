const router = require('express').Router();

const userController = require('../../controller/v1/userController');
const accountController = require('../../controller/v1/accountController');
const transactionController = require('../../controller/v1/transactionController');

router.post('/register', userController.store);
router.get ('/users', userController.index);
router.get ('/users/:id', userController.show);

router.post('/make-accounts', accountController.store);
router.get ('/accounts', accountController.index);
router.get ('/accounts/:id', accountController.show);

router.post('/make-transactions', transactionController.store);
router.get ('/transactions', transactionController.index);
router.get ('/transactions/:transactionId', transactionController.show);


module.exports = router;