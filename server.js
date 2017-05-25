var express = require('express'),
    app     = express(),
    eps     = require('ejs'),
    os      = require("os");
    
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3001,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    health_status=true;


app.get('/', function (req, res) {
    res.render('index.html', { os_host_name : os.hostname()});
});

app.get('/healthz', function (req, res) {
  console.log('Health Check')
  if(health_status)
   res.send('OK');
  else
   res.status(404).send('NOT OK');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  health_status=false
  res.status(500).send('Something bad happened !!!');
});


app.listen(port, ip);
console.log('Server is running on http://%s:%s', ip, port);

