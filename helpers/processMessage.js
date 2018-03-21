const API_AI_TOKEN = '0f3f0d3a2f1242c4a670a533456bcd53';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAZA388K59q8BAF1F5zYUfP8TCezRUuUiO57zb4cUkyMa60QQhm8yIMPZAZBrEdUKlaRULwvHMayuse4LeazPois5NjBj3uhhNnaDT1yckfbmqiQXDtZBIZC1pD9rPZAfgoR1SytWuOt4lIS8nakljNp5Mj04fp4cEe2LvdIEynDtTmuUVPPy7';
const request = require('request');
var fs = require('fs');
var images;
fs.readFile('./imgs/images.json', 'utf8', function(err, data) {
  if (err) throw err;
  images = JSON.parse(data);
});

const sendTextMessage = (senderId, text) => {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: FACEBOOK_ACCESS_TOKEN
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        text
      },
    }
  });
};

const sendImageMessage = (senderId, imageUrl) => {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: FACEBOOK_ACCESS_TOKEN
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        "attachment": {
          "type": "image",
          "payload": {
            "url": imageUrl,
            "is_reusable": true
          }
        }
      }
    }
  });
};
module.exports = (event) => {
  const senderId = event.sender.id;
  const message = event.message.text;
  const apiaiSession = apiAiClient.textRequest(message, {
    sessionId: 'sessionId'
  });
  apiaiSession.on('response', (response) => {
    result = " ";
    if (message.charAt(0) == '!') {
      if (message == "!cat") {
        sendImageMessage(senderId, images.imgArray[Math.floor(Math.random() * images.imgArray.length)]);
      }else if (message.split(" ")[0] == "!reaction") {
        sendImageMessage(senderId, images.reactionArray[Math.floor(Math.random() * images.reactionArray.length)]);
      }else if (message=="!help") {
        sendTextMessage(senderId, "!cat returns a photo of a cat, !reaction returns a cat themed reaction");
      }else{
        sendTextMessage(senderId, "That is not a valid command for a list of commands please use !help");
      }
    } else {
      result = response.result.fulfillment.speech;
      sendTextMessage(senderId, result);
    }

  });
  apiaiSession.on('error', error => console.log(error));
  apiaiSession.end();
};
