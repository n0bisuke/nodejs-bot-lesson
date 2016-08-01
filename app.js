'use strict'

const Twitter = require('twitter');
const client = new Twitter(require('./config'));
const tw_post = require('./libs/twitter_post');
const tenki = require('./scripts/tenki');

client.stream('statuses/filter', {'track':'@n0bisuke'}, (stream) => {
  stream.on('data', (data) => {
    let words = data.text.split(' ');
    console.log(words);

    if(!words[1]){
      console.log('コマンドなし');
      return; //エラー コマンドなし
    }
    
    let command = words[1];
    if(command === 'ping'){
      //ここにpingコマンドをキャッチしたときの処理を書く
      console.log('pingって言われた。');
      tw_post(data.user.screen_name, 'pong', client); //libs/twitter_post.jsから呼び出す 
    }else if(command === 'tenki'){
      //tenkiコマンドをキャッチしたときの処理
      tenki((tweet) => {
        tw_post(data.user.screen_name, tweet, client); //libs/twitter_post.jsから呼び出す
      });
    }

  });
});

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({port: 1989});

server.route({
  method: 'GET',
  path:'/',
  handler: (request, reply) => {
    reply().code(204);
    console.log(request.query);
    console.log('-------\n');
    tw_post('', `${request.query.user}`, client);
  }
});

server.start(() => {
  console.log('Server running at:', server.info.uri);
});

// let params = {screen_name: 'n0bisuke'};
// client.get('statuses/user_timeline', params, (error, tweets, response) => {
//   if (!error) {
//     console.log(tweets);
//   }
// });