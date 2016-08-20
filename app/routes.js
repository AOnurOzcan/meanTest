var User = require('./models/user');
var List = require('./models/list');

function getLists(req, res) {
  List.find({user_id: req.user.id}, null, {createdAt: -1}, function (err, lists) {
    if (err) {
      res.send(err);
    }

    res.json(lists); // return all todos in JSON format
  });
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect(301, '/');
}

module.exports = function (app, passport) {

  // route to test if the user is logged in or not
  app.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : false);
  });

  //Listeleri getir
  app.get('/api/list', isLoggedIn, function (req, res) {
    //Giriş yapmış olan kullanıcıya ait tüm listeleri getir.
    getLists(req, res);
  });

  app.get('/api/list/recent', function (req, res) {
    List.find({}).sort({createdDate: -1}).limit(6).exec(function (err, lists) {
      if (err) return res.send(err);

      res.json(lists);
    });
  });

  //Liste oluştur
  app.post('/api/list', function (req, res) {
    var list = new List({
      title: req.body.title,
      user_id: req.user.id
    });

    list.save(function (err) {
      if (err) return handleError(err);
      getLists(req, res);
    });
  });

  app.post('/api/item/', isLoggedIn, function (req, res) {
    List.findById(req.body.list_id, function (err, list) {
      list.items.push({item: req.body.item});
      list.save(function (err) {
        if (err) return res.send(err);

        getLists(req, res);
      });
    });
  });

  //Liste silme
  app.delete('/api/list/:list_id', isLoggedIn, function (req, res) {
    List.findById(req.params.list_id, function (err, list) {
      if (err) return res.send(err);

      list.remove();

      getLists(req, res);
    });
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    User.findOne({_id: req.user.id}, function (err, user) {
      if (err)
        return res.json({error: true});
      res.json(user);
    });
  });

  // facebook -------------------------------

  // send to facebook to do the authentication
  app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/#/profile',
    failureRedirect: '/'
  }));

  app.get('/logout', function (req, res) {
    req.logout();
    res.json({logout: true});
  });
};
