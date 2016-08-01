'use strict'

const Twitter = require('twitter');
const client = new Twitter(require('./config'));
 
// let params = {screen_name: 'n0bisuke'};
// client.get('statuses/user_timeline', params, (error, tweets, response) => {
//   if (!error) {
//     console.log(tweets);
//   }
// });

// let tweet = 'ねむ';
// client.post('statuses/update', {status : tweet}, (error, tweet, response) => {
//     if (error) {
//         process.stderr.write(error + '\n');
//         return;
//     }
// });

client.stream('statuses/filter', {'track':'@n0bisuke'}, (stream) => {
  stream.on('data', (data) => {
    let words = data.text.split(' ');
    console.log(words);

    if(!words[1]){
      console.log('コマンドなし');
      return; //エラーコマンドなし
    }
    
    let command = words[1];
    if(command === 'ping'){
      //ここにpingコマンドをキャッチしたときの処理を書く 
    }
  });
});

