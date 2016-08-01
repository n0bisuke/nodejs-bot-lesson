module.exports = (reply_target, tweet, client) => {
    let time = new Date().getTime(); //Twitterの投稿仕様にひっかからなくする
    tweet = `@${reply_target} ${tweet} ${time}`;
    console.log(tweet);
    client.post('statuses/update', {status : tweet}, (error, tweet, response) => {
        if (error) {
            process.stderr.write(error + '\n');
            return;
        }
    });
}
