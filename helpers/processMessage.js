const API_AI_TOKEN = '0f3f0d3a2f1242c4a670a533456bcd53';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAZA388K59q8BAF1F5zYUfP8TCezRUuUiO57zb4cUkyMa60QQhm8yIMPZAZBrEdUKlaRULwvHMayuse4LeazPois5NjBj3uhhNnaDT1yckfbmqiQXDtZBIZC1pD9rPZAfgoR1SytWuOt4lIS8nakljNp5Mj04fp4cEe2LvdIEynDtTmuUVPPy7';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: ''});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};
