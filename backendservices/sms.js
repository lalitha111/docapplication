// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'ACa186cd6223e30ccd47f42c2a6aaf4bf4';
const authToken = '8812fe026480c3726389c876579d2325';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'hiii, your project works',
     from: '+12029155184',
     to: '+918790052438'
   })
  .then(message => console.log(message.sid));
