const redis = require('redis');
const express = require('express');
const url = require('url');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const middleware = require('./middleware');
require('dotenv').config();

let client = null;
if (process.env.REDISTOGO_URL) {
  let rtg = url.parse(process.env.REDISTOGO_URL);
  client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(':')[1]);
} else {
  client = redis.createClient();
}


const app = express();
const server = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ store: new RedisStore({ client: client }), secret: 'secret', resave: true, saveUninitialized: true }));

app.use(middleware.router);

middleware.socketIO(server);

server.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));
