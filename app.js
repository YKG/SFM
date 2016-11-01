var express = require('express');
var http = require('http');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/movie', function (req, resp) {
  var options = {
    host: 'localhost',
    port: 8080,
    path: req.url,
    method: 'GET'
  };

  http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    var body = '';
    res.on('data', function(chunk){
      body += chunk;
    });

    res.on('end', function(){
      var data = JSON.parse(body);
      console.log("Got a response: ", data);
      data = data.map(function (elem) {
        return {
          value: elem.name,
          label: elem.name,
          mid: elem.id
        };
      });
      resp.send(data);
    });
  }).end();
});

app.get('/movie/search', function (req, resp) {
  var options = {
    host: 'localhost',
    port: 8080,
    path: req.url,
    method: 'GET'
  };

  http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    var body = '';
    res.on('data', function(chunk){
      body += chunk;
    });

    res.on('end', function(){
      var data = JSON.parse(body);
      console.log("Got a response: ", data);
      resp.send(data);
    });
  }).end();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
