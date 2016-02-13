var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var db = req.db;
  var collection = db.get('todocollection');
  collection.find({},{},function(e, docs) {
    var todos = [];

    var objKey = Object.keys(docs);
    objKey.forEach(function(objectid) {
      var items = Object.keys(docs[objectid]);
      items.forEach(function(itemkey) {
        var itemvalue = docs[objectid][itemkey];
        if(itemkey === "content")
          todos.push(itemvalue);
      })
    })
    res.render('index', { title: 'TodoList', "todolist" : todos });
  }); 
});


router.get('/addtodo', function(req, res) {
  res.render('addtodo', { title: 'TodoList - Add new Todo' });
});


/* POST to Add Todo Service */
router.post('/addtodo', function(req, res) {
  var db = req.db;
  var content = req.body.content;
  var collection = db.get('todocollection');

  collection.insert({
    "content" : content
  }, function (err, doc) {
    if (err) {
      res.send("There was a problem adding the information to the database.");
    } else {
      res.location("/");
      res.redirect("/");
    }
  })
});


module.exports = router;
