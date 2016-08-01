var Twitter = require('twitter');
var client = new Twitter(require('./config'));
 
var params = {screen_name: 'n0bisuke'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});