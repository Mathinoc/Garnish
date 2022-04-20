const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router.js');
require('dotenv').config();
const PORT = process.env.SERVER_PORT || 3001;
// const mongoose = require('./models/index_model.js');

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());

// mongoose.connection.on('connected', ()=>{
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT} 🪁`));
// })
