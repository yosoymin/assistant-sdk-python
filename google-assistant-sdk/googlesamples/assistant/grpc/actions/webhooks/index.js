// Import the appropriate service and chosen wrappers
const {
    actionssdk,
    Image,
} = require('actions-on-google')

// Create an app instance
const app = actionssdk()

// Register handlers for Actions SDK intents
app.intent('actions.intent.MAIN', conv => {
    conv.ask('<speak>Hi! <break time="1"/> ' +
        'I can read out an ordinal like ' +
        '<say-as interpret-as="ordinal">123</say-as>. Say a number.</speak>');
})

app.intent('actions.intent.TEXT', (conv, input) => {
    if (input === 'bye') {
        return conv.close('Goodbye!');
    }
    conv.ask('<speak>You said, ' +
        `<say-as interpret-as="ordinal">${input}</say-as></speak>`);
})

/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/


var https = require('https');
var http = require('http');
var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
var options = {
    key: fs.readFileSync('./client-key.pem'),
    cert: fs.readFileSync('./client-cert.pem')
};

// Create an HTTP service.
//http.createServer(app).listen(80);
http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
}).listen(80);

// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);