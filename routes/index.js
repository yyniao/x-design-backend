const path = require('path');
const Router = require('koa-router');
const router = new Router({prefix: '/api'});

const files = ['user', 'upload'];

files.forEach(file => {
    const file_entity = require(path.join(__dirname, file));
    router.use(`/${file}`, file_entity.routes(), file_entity.allowedMethods())
});

module.exports = router;
