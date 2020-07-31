const Router = require('koa-router');
const UserController = require('../controller/user');

const router = new Router();
router.post('/get', UserController.login);

module.exports = router;