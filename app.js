'use strict'

const Twitter = require('twitter');
const client = new Twitter(require('./config'));
 
let params = {screen_name: 'n0bisuke'};
client.get('statuses/user_timeline', params, (error, tweets, response) => {
  if (!error) {
    console.log(tweets);
  }
});