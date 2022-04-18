const Router = require('koa-router');
const { parseRecipe } = require('./controllers/index_controller.js');

const router = new Router();

router.get('/parse', parseRecipe);
// router.post('/message', message.post);
// router.delete('/delete', message.delMessage);

module.exports = router;
