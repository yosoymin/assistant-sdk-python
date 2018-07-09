// Import the appropriate service and chosen wrappers
const {
    actionssdk,
    Image,
} = require('actions-on-google')
var express = require('express')
const bodyParser = require('body-parser')

// Create an app instance
const app = actionssdk();

// Register handlers for Actions SDK intents
app.intent('actions.intent.MAIN', conv => {
    conv.ask('<speak>Hi! <break time="1"/> ' +
        'I can read out an ordinal like ' +
        '<say-as interpret-as="ordinal">123</say-as>. Say a number.</speak>');
})

app.intent('PlayInfo', (conv, input) => {
    if (input === 'bye') {
        return conv.close('Goodbye!');
    }
    //conv.ask('<speak>You said, ' + `<say-as interpret-as="ordinal">${input}</say-as></speak>`);
    conv.ask('Está sonando algo increible para mi');
})

var https = require('https');
var http = require('http');
var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
var options = {
    key: fs.readFileSync('./client-key.pem'),
    cert: fs.readFileSync('./client-cert.pem')
};

var expressApp = express();
expressApp.use(bodyParser.json(), app);

// Create an HTTP service.
http.createServer(expressApp).listen(80);
/*http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
}).listen(80);*/

// Create an HTTPS service identical to the HTTP service.
https.createServer(options, expressApp).listen(443);
