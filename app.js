const express = require('express')
const app = express()
let counter = 1
let healthcheck = require('healthcheck-middleware')
let paths = [ '/', '/greeting', '/hostinfo' ]
let port = 5000;
let welcome = 'This is my webservice!'

app.get('/', function (req, res) {
  res.send({
    message: welcome,
    paths: paths
  });
});
app.get('/greeting/:name?', function (req, res) {
  let name = 'World';
  if (req.params.name) {
    name = req.params.name;
  } else if (req.query.name) {
    name = req.query.name;
  }
  res.send({
    id: counter++,
    content: 'Hello, ' + name + '!'
  });
});
app.get('/hostinfo', function (req, res) {
  res.send({
    hostname: process.env.HOSTNAME
  });
});
app.use('/health', healthcheck({
  healthInfo: function(passInfo) {
    return {
      status: passInfo.status,
      uptime: process.uptime(),
      hostname: process.env.HOSTNAME,
      memoryUsage: process.memoryUsage()
    }
  }
}));
app.listen(port, function () {
  console.log('Example app listening on port %s!', port);
});

module.exports = app;
