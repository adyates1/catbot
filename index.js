const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const verification = require('./controllers/verification')

const messageWebhook = require('./controllers/messageWebhook')

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', verification)

app.post('/', messageWebhook)

app.listen(80, () => console.log('Webhook server is listening, port 3000'));

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
app.get('/', verificationController);
app.post('/', messageWebhookController);
