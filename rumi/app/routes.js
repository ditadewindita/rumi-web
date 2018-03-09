var path = require('path');

module.exports = function(app) {

  // 'RumiDashboard' app
  app.get('/dashboard', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../public') + '/views/dashboard/index.html')
  });

  // 'Rumi' app
  app.get('/login', function(req, res) {
      res.sendFile(path.resolve(__dirname, '../public') + '/index.html');
  });

  app.get('/register', function(req, res) {
      res.sendFile(path.resolve(__dirname, '../public') + '/index.html');
  });

  app.get('/', function(req, res) {
      res.render(path.resolve(__dirname, '../public') + '/index.html');
  });

};
