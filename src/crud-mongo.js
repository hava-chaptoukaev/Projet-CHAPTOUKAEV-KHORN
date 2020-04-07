var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');
//var url = 'mongodb://localhost:27017/db';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'database';

exports.connexionMongo = function(callback) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db(dbName);

    assert.equal(null, err);
    callback(err, db);
  });
}

exports.getData = function(page, pagesize, callback) {
  MongoClient.connect(url, function(err, client) {
    console.log("pagesize = " + pagesize);
    console.log("page = " + pagesize);

    var db = client.db(dbName);

    console.log("db " + db)
    if(!err){
      db.collection('data')
        .find()
        .skip(page*pagesize)
        .limit(pagesize)
        .toArray()
        .then(arr => callback(arr));
    }
    else{
      callback(-1);
    }
  });
};

exports.findCaseById = function(id, callback) {
  MongoClient.connect(url, function (err, client) {
    var db = client.db(dbName);
    if (!err) {
      // La requete mongoDB

      let myquery = {"_id": ObjectId(id)};

      db.collection("datas")
        .findOne(myquery, function (err, data) {
          let reponse;

          if (!err) {
            reponse = {
              succes: true,
              cas: data,
              error: null,
              msg: "Details du cas envoyé"
            };
          } else {
            reponse = {
              succes: false,
              cas: null,
              error: err,
              msg: "erreur lors du find"

            };
          }
          callback(reponse);
        });
    } else {
      let reponse = reponse = {
        succes: false,
        cas: null,
        error: err,
        msg: "erreur de connexion à la base"
      };
      callback(reponse);
    }
  });

  exports.findTemById = function (id, callback) {
    MongoClient.connect(url, function (err, client) {
      var db = client.db(dbName);
      if (!err) {
        // La requete mongoDB

        let myquery = {"_id": ObjectId(id)};

        db.collection("data")
          .findOne(myquery, function (err, data) {
            let reponse;

            if (!err) {
              reponse = {
                succes: true,
                temoignage: data,
                error: null,
                msg: "Details du témoignage envoyé"
              };
            } else {
              reponse = {
                succes: false,
                temoignage: null,
                error: err,
                msg: "erreur lors du find"

              };
            }
            callback(reponse);
          });
      } else {
        let reponse = reponse = {
          succes: false,
          temoignage: null,
          error: err,
          msg: "erreur de connexion à la base"
        };
        callback(reponse);
      }
    });
  }
};
