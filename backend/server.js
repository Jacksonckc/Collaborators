const Express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

const Database = require('./src/db/database');
const { getAuth } = require('./src/middleware/auth');

const app = new Express();
const port = process.env.PORT || 3000;
const database = new Database();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.listen(port, async () => {
  await database.init();
  console.log(`Collaborators backend listening on port ${port}`);
});

app.use('/', require('./src/routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});
