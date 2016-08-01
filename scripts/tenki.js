const http = require('http');
const TENKI_URL = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=030010';

module.exports = (cb) => {
    http.get(TENKI_URL, (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', (res) => {
            res = JSON.parse(body);
            let tweet = `${res.forecasts[0].dateLabel}の${res.location.city}は${res.forecasts[0].telop}で最高気温は${res.forecasts[0].temperature.max.celsius}度です。`;
            cb(tweet);
        });
    }).on('error', (e) => {
        console.log(e.message); //エラー時
    });
}