const Express = require('express');
const router = require('./router');
const path = require('path')
const cors = require('cors');
const { config } = require('dotenv');
require('dotenv').config();
const PORT = process.env.PORT || 3006;
// const PORT = process.env.PORT || process.env.SERVER_PORT || 3001;

const app = Express();

config();

app.use(cors());

app.use(Express.json());    //parse the req object (json.parse)

app.use(router);

app.use(Express.static(path.join(__dirname + './../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT} 🪁`));
