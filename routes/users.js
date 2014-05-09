/**
 *
 * require mongodb driver
 * database connection
 */
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost',27017,{auto_reconnect:true});
db = new Db('usersdb',server);

db.open(function(err,db){
   if(!err){
       console.log('connected to usersdb database');
       db.collection('users',{strict:true},function(err,collection){
           if(err){
               console.log('the users collection doesnt exist');
               populateDB();
           }
       });
   }
});

/**
 * find user by id
 * HTTP METHOD GET
 * @param req
 * @param res
 */
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving user: ' + id);
    db.collection('users', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

/**
 * find all users
 * HTTP METHOD GET
 * @param req
 * @param res
 */
exports.findAll = function(req,res){
    db.collection('users', function(err,collection){
       collection.find().toArray(function(err, items){
          res.send(items);
       });
    });
};

/**
 * add new user
 * using http raw body data method post for send data
 * HTTP METHOD POST
 * @param req
 * @param res
 */
exports.addUser = function(req, res){
  var user = req.body // get request body data
  console.log('Add users '+ JSON.stringify(user));
  db.collection('users',function(err,collection){
    collection.insert(user, {safe:true}, function(err,result){
      if(err){
          res.send({'error':'An error has occured'});
      }else{
        res.send({'Success': JSON.stringify(result[0])});
      }
    });

  });

};

/**
 * update user
 * paramter id
 * http method PUT
 * @param req
 * @param res
 */

exports.updateUser = function(req, res) {
    var id = req.params.id;
    var user = req.body;
    console.log('Updating user: ' + id);
    console.log(JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(user);
            }
        });
    });
}

/**
 * delete user
 * paramters id
 * HTTP METHOD DELETE
 * @param req
 * @param res
 */
exports.deleteUser = function(req, res) {
    var id = req.params.id;
    console.log('Deleting user: ' + id);
    db.collection('users', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

var populateDB = function() {

    var users = [
        {
            name: "CHATEAU DE SAINT COSME",
            year: "2009",
            grapes: "Grenache / Syrah",
            country: "France",
            region: "Southern Rhone",
            description: "The aromas of fruit and spice...",
        },
        {
            name: "LAN RIOJA CRIANZA",
            year: "2006",
            grapes: "Tempranillo",
            country: "Spain",
            region: "Rioja",
            description: "A resurgence of interest in boutique vineyards...",
        }];

    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });

};