const Express = require('express');
const router = require('./router');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.SERVER_PORT || 3001;
// const mongoose = require('./models/index_model.js');

const app = Express();

app.use(cors());

app.use(Express.json());    //parse the req into json
app.use(router);

// mongoose.connection.on('connected', ()=>{
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT} 🪁`));
// })
