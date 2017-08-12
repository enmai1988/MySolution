const express = require('express');
const redis = require('redis');
const url = require('url');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const middleware = require('./middleware');
const config = require('config');

let client = null;
if (process.env.REDISTOGO_URL) {
  let rtg = url.parse(process.env.REDISTOGO_URL);
  client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(':')[1]);
} else {
  client = redis.createClient(6379, config.redis.host);
}

const app = express();
const server = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ store: new RedisStore({ client }), secret: 'secret', resave: true, saveUninitialized: true }));

app.use(middleware.router);

middleware.socketIO(server);

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`listening on port ${port}`));
