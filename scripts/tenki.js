const http = require('http');
const TENKI_URL = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=030010';
http.get(TENKI_URL, (res) => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        body += chunk;
    });

    res.on('end', (res) => {
        res = JSON.parse(body);
        console.log(res);
    });
}).on('error', (e) => {
    console.log(e.message); //エラー時
});