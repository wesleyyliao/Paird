// Implement your server in this file.
// We should be able to run your server with node src/server.js

// Parses response bodies.
var bodyParser = require('body-parser');
var ResetDatabase = require('./resetdatabase');

var DealSchema = require('./schemas/deal.json');

// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');
var validate = require('express-jsonschema').validate;

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/paird';

MongoClient.connect(url, function(err, db) {

  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(express.static('../client/build'));
  app.use('/mongo_express', mongo_express(mongo_express_config));

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                 HELPER FUNCTIONS - NOTHING TO DO WITH DB                   //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

  /**
   * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
   */
  function getUserIdFromToken(authorizationLine) {
    try {
      // Cut off "Bearer " from the header value.
      var token = authorizationLine.slice(7);
      // Convert the base64 string to a UTF-8 string.
      var regularString = new Buffer(token, 'base64').toString('utf8');
      // Convert the UTF-8 string into a JavaScript object.
      var tokenObj = JSON.parse(regularString);
      var id = tokenObj['id'];
      // Check that id is a number.
      if (typeof id === 'string') {
        return id;
      } else {
        // Not a number. Return -1, an invalid ID.
        return -1;
      }
    } catch (e) {
      // Return an invalid ID.
      return -1;
    }
  }

  /**
   * Helper function: Sends back HTTP response with error code 500 due to
   * a database error.
   */
  function sendDatabaseError(res, err) {
    res.status(500).send("A database error occurred: " + err);
  }

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//  INTERNAL SERVER FUNCTIONS - CALLED BY HTTP ROUTES OR OTHER INTERNAL ONES  //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

  /**
   * Resolves a list of user objects. Returns an object that maps user IDs to
   * user objects.
   */
  function resolveUserObjects(userList, callback) {
    // Special case: userList is empty.
    // It would be invalid to query the database with a logical OR
    // query with an empty array.
    if (userList.length === 0) {
      callback(null, {});
    } else {
      // Build up a MongoDB "OR" query to resolve all of the user objects
      // in the userList.
      var query = {
        $or: userList.map((id) => {
          return {
            _id: id
          }
        })
      };
      db.collection('users').find(query).toArray(function(err, users) {
        if (err) {
          return callback(err);
        }
        // Build a map from ID to user object.
        // (so userMap["4"] will give the user with ID 4)
        var userMap = {};
        users.forEach((user) => {
          userMap[user._id] = user;
        });
        callback(null, userMap);
      });
    }
  }

  /**
   * Resolves a list of deal objects. Returns an object that maps deal IDs to
   * deal objects.
   */
  function resolveDealObjects(dealList, callback) {
    // Special case: dealList is empty.
    // It would be invalid to query the database with a logical OR
    // query with an empty array.
    if (dealList.length === 0) {
      callback(null, {});
    } else {
      // Build up a MongoDB "OR" query to resolve all of the deal objects
      // in the dealList.
      var query = {
        $or: dealList.map((id) => {
          return {
            _id: id
          }
        })
      };
      db.collection('deals').find(query).toArray(function(err, deals) {
        if (err) {
          return callback(err);
        }
        // Build a map from ID to deal object.
        // (so dealMap["4"] will give the user with ID 4)
        var dealMap = {};
        deals.forEach((deal) => {
          dealMap[deal._id] = deal;
        });
        callback(null, dealMap);
      });
    }
  }

  /**
   * Resolves an array of deal IDs, returning their corresponding deals.
   * Internal to the server.
   * @param dealIds An array of deal IDs. Must be ObjectIDs.
   * @param callback Called when the operation finishes. First argument is an
   *   error object, which is null if the operation succeeds, and the second
   *   argument is the array of resolved deals.
   */
  function getDealsData(dealIds, callback) {
    console.log("get deals data");
    // Special case: dealList is empty.
    // It would be invalid to query the database with a logical OR
    // query with an empty array.
    if (dealIds.length === 0) {
      callback(null, {});
    } else {
      // Build up a MongoDB "OR" query to resolve all of the deal objects
      // in the dealList.
      var query = {
        $or: dealIds.map((id) => {
          return {
            _id: id
          }
        })
      };
      // // Get the feed item with the given ID.
      // db.collection('deals').findOne({
      //   _id: dealId
      // }, function(err, dealObj) {
      //   if (err) {
      //     // An error occurred.
      //     // console.log("err " + err);
      //     return callback(err);
      //   } else if (dealObj === null) {
      //     // Deal item not found!
      //     // console.log("Deal item not found!");
      //     return callback(null, null);
      //   }
      db.collection('deals').find(query).toArray(function(err, deals) {
        if (err) {
          callback(err);
        }
        // Build a list of all of the user objects we need to resolve.
        // var userList = [dealObj.owner];
        var ownerIds = deals.map((deal) => {
          return deal.owner;
        });
        var paireeIds = deals.map((deal) => {
          return deal.pairee;
        });
        // concatenate, get rid of duplicates, ignore undefineds
        var userIds = [];
        for (var i in ownerIds) {
          var ownerId = ownerIds[i];
          var found = userIds.some((id) => {
            return id === ownerId;
          });
          if (!found) { userIds.push(ownerId); }
        }
        for (i in paireeIds) {
          var paireeId = paireeIds[i];
          if (paireeId !== undefined) {
            found = userIds.some((id) => {
              return id === paireeId;
            });
            if (!found) { userIds.push(paireeId); }
          }
        }
        // userList.push(dealObj.pairee);
        // Resolve all of the user objects!
        resolveUserObjects(userIds, function(err, userMap) {
          if (err) {
            callback(err);
          }
          // // Use the userMap to look up the author's user object
          // dealObj.owner = userMap[dealObj.owner];
          // dealObj.pairee = userMap[dealObj.pairee]
          for (i in deals) {
            var deal = deals[i];
            deal.owner = userMap[deal.owner];
            if (deal.pairee !== undefined) { deal.pairee = userMap[deal.pairee]; }
          }
          // Return the resolved deals
          callback(null, deals);
        });
      });
      // }
    }
  }

  /**
   * Update value of field in deal profile.
   * @param dealId The ID of the deal being edited.
   * @param field The field in the deal document to be edited.
   * @param value The edited value of the field.
   * @param callback The function to be executed upon completion of the edit.
   */
  function editDealProfileField(dealId, field, value, callback) {
    var update = { $set: {} };
    // Compute the string path to the author field of the target comment
    update.$set[field] = value;
    db.collection('deals').updateOne({
      _id: dealId
    }, update, function(err, results) {
      if (err) {
        return callback(err);
      }
      callback(results);
    });
  }

  /**
   * TODO: "expDate": time.strtotime("+1 week") is technically hardcoded so fix that!!!!
   *
   * Adds a new deal to the database. Update deal and owner (user) documents
   * accordingly.
   * @param userId The user ID corresponding to the owner (creator) of the deal.
   * @param title The title of the deal.
   * @param description An array containing the bullet points describing the deal.
   * @param minPrice The least amount a potential pairee would need to pay to
   *                 participate in the deal. In monetary units.
   * @param link The URL (String) that links to the webpage containing the original deal.
   * @param expDate The expiration date of the deal, in UNIX time.
   * @param imagePath The string path to the image for the deal.
   * @param tags TODO: make sure tags are delimited and made into array!
   * @param callback The function to be executed upon completion of the post.
   */
  function postDeal(userId, title, description, minPrice, link, expDate, imagePath, tags, callback) {
    var time = new Date().getTime();
    var newDeal = {
      "owner": userId,
      "title": title,
      "imagePath": imagePath,
      "description": description,
      "minPrice": minPrice,
      "link": link,
      "postDate": time,
      "expDate": expDate,
      "tags": tags
    };
    // Add deal to database
    db.collection('deals').insertOne(newDeal, function(err, result) {
      if (err) {
        return callback(err);
      }
      // MongoDB doesn't return object with the set _id
      // So attach it to the object we are intending to return
      newDeal._id = result.insertedId;
      // Update open deal list of user that posted this
      // Similar to facebook, but no need to access another collection as openDeals is in the users collection
      db.collection('users').updateOne({
          _id: userId
        }, {
          $push: {
            openDeals: {
              $each: [newDeal._id],
              $position: 0
            }
          }
        },
        function(err) {
          if (err) {
            return callback(err);
          }

          // Debugging tools
          // console.log(newDeal.owner);
          // db.collection('users').findOne({ _id: userId }, function(err, userItem) {
          //   console.log(userItem.openDeals);
          // });
          // db.collection('deals').findOne({ _id: newDeal._id }, function(err, dealItem) {
          //   console.log(dealItem.title);
          // });

          // Return the new deal to application
          callback(null, newDeal);
        }
      );
    });
  }

  /**
   * Pair a user to existing deal owned by another user. Update deal and user
   * documents accordingly.
   * @param dealId The ID of the existing deal.
   * @param paireeId The user who is electing to participate in the deal.
   * @param cb The function to be executed upon completion of the pairing.
   */
  function pairUser(dealId, paireeId, callback) {
    // tell deal who its pairee is
    db.collection('deals').updateOne({
        _id: dealId
      }, {
        $set: {
          pairee: paireeId
        }
      },
      function(err) {
        if (err) {
          return callback(err);
        }
        // tell pairee that deal is part of their closed deals
        db.collection('users').updateOne({
            _id: paireeId
          }, {
            $push: {
              closedDeals: {
                $each: [dealId],
                $position: 0
              }
            }
          },
          function(err) {
            if (err) {
              return callback(err);
            }
            // grab deal object
            db.collection('deals').findOne({
              _id: dealId
            }, function(err, dealObj) {
              if (err) {
                return callback(err);
              }
              // tell owner of deal that it is part of their closed deals
              // and remove it from its open deals
              db.collection('users').updateOne({
                  _id: dealObj.owner
                }, {
                  $push: {
                    closedDeals: {
                      $each: [dealObj._id],
                      $position: 0
                    }
                  }
                },
                function(err) {
                  if (err) {
                    return callback(err);
                  }
                  db.collection('users').updateOne({
                      _id: dealObj.owner
                    }, {
                      $pull: {
                        openDeals: dealObj._id
                      }
                    },
                    function(err) {
                      if (err) {
                        return callback(err);
                      }
                      // Return the paired deal to the application.
                      return callback(err, dealObj);
                    }
                  );
                }
              );
            });
          }
        );
      }
    );
  }

  /**
   * Resolves an array of user IDs, returning their corresponding users.
   * Internal to the server.
   * @param userIds An array of user IDs. Must be ObjectIDs.
   * @param callback Called when the operation finishes. First argument is an
   *   error object, which is null if the operation succeeds, and the second
   *   argument is the array of resolved users.
   */
  function getUsersData(userIds, callback) {
    // Special case: userList is empty.
    // It would be invalid to query the database with a logical OR
    // query with an empty array.
    if (userIds.length === 0) {
      callback(null, {});
    } else {
      // Build up a MongoDB "OR" query to resolve all of the deal objects
      // in the dealList.
      var query = {
        $or: userIds.map((id) => {
          return {
            _id: id
          }
        })
      };
      db.collection('users').find(query).toArray(function(err, users) {
        if (err) {
          callback(err);
        }
        var openDeals = users.map((user) => {
          return user.openDeals;
        });
        var closedDeals = users.map((user) => {
          return user.closedDeals;
        });
        var flattenedOpenDeals = [].concat.apply([], openDeals);
        var flattenedClosedDeals = [].concat.apply([], closedDeals);
        // concatenate
        var dealIds = flattenedOpenDeals.concat(flattenedClosedDeals);
        // Resolve the open and closed deals objects
        resolveDealObjects(dealIds, function(err, dealMap) {
          if (err) {
            callback(err);
          }
          users.map((user) => {
            user.openDeals = user.openDeals.map((openDealId) => {
              return dealMap[openDealId];
            });
            user.closedDeals = user.closedDeals.map((closedDealId) => {
              return dealMap[closedDealId];
            });
          });
          // Return the resolved user
          callback(null, users);
        }); // end of resolveDealObjects
      }); // end of db.collection
    } // end of else
  } // end of usersdata

  /**
   * Update value of field in user profile.
   * @param userId The ID of the user being edited.
   * @param field The field in the user document to be edited.
   * @param value The edited value of the field.
   * @param callback The function to be executed upon completion of the edit.
   */
  function editUserProfileField(userId, field, value, callback) {
    var update = { $set: {} };
    // Compute the string path to the author field of the target comment
    update.$set[field] = value;
    db.collection('users').updateOne({
      _id: userId
    }, update, function(err, results) {
      if (err) {
        return callback(err);
      }
      console.log("results is " + results);
      callback(results);
    });
  }

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                                 HTTP ROUTES                                //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

  /**
   * Get the deal data for a articular deal ID
   */
  app.get("/deal/:id", function(req, res) {
    console.log("HIT: get /deal/" + req.params.id);
    var dealId = req.params.id;
    // var fromUser = getUserIdFromToken(req.get('Authorization'));
    // if (fromUser === userid) {
      getDealsData([new ObjectID(dealId)], function(err, wrappedDeal) {
      // resolveDealObjects([new ObjectID(dealId)], function(err, wrappedDeal) {
        // extract deal from deal map (containing only this deal)
        var deal = wrappedDeal[0];
        if (err) {
          // A database error happened. Internal Error: 500.
          res.status(500).send("Database error: " + err);
        } else if (deal === null) {
          // Couldn't find the deal in the database.
          res.status(400).send("Could not look up deal " + dealId);
        } else {
          // Send data.
          res.send(deal);
        }
      // }
    });
  });

  // `GET /deals/ids`
  app.get("/deals/:ids", function(req, res) {
    console.log("HIT: get /deals/" + req.params.ids);
    var idList = req.params.ids.split(",");
    // var dealList = idList.map((id) => getDealData(new ObjectID(id), function(err, dealData) {
    getDealsData(idList.map((id) => new ObjectID(id)), function(err, dealsData) {
      if (err) {
        // A database error happened. Internal Error: 500.
        res.status(500).send("Database error: " + err);
      // } else if (dealData === null) {
      //   // Couldn't find the deal in the database.
      //   // res.status(400).send("Could not look up deal");
      } else {
        // Send data.
        res.send(dealsData);
      }
    });
  });

  // TODO FIX THIS: Changed description in schema from array to string for now
  // `POST /deal` deal
  app.post('/deal', validate({ body: DealSchema }), function(req, res) {
    console.log("HIT: post /deal");
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === body.owner) {
      postDeal(new ObjectID(fromUser), body.title, body.description, body.minPrice, body.link, body.expDate, body.imagePath, body.tags, function(err, newDeal) {
        if (err) {
          // A database error happened.
          // 500: Internal error.
          res.status(500).send("A database error occurred: " + err);
        } else {
          // When POST creates a new resource, we should tell the client about it
          // in the 'Location' header and use status code 201.
          res.status(201);
          res.set('Location', '/deal/' + newDeal._id);
          // Send the update!
          res.send(newDeal);
        }
      });
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  });

  // `PUT /deal/dealId` pairee
  app.put("/deal/:id", function(req, res) {
    console.log("HIT: put /deal/" + req.params.id);
    var dealId = req.params.id;
    var paireeId = req.body.paireeId;
    // var fromUser = getUserIdFromToken(req.get('Authorization'));
    // // Check if requester is authorized to pair.
    // if (fromUser === paireeId) {
      pairUser(new ObjectID(dealId), new ObjectID(paireeId), function(err, pairedDeal) {
        if (err) {
          return sendDatabaseError(res, err);
        } else {
          // Send the update!
          res.send(pairedDeal);
        }
      });
    // } else {
    // // 401: Unauthorized.
    // res.status(401).end();
    // }
  });

  // `PUT /deal/dealId/field` value

  app.put("/deal/:id/:field", function(req, res) {
    console.log("HIT: put /deal/" + req.params.id + "/" + req.params.field);
    var dealId = new ObjectID(req.params.id);
    var field = req.params.field;
    var value = req.body;

    // var fromDeal = getDealIdFromToken(req.get('Authorization'));
    console.log(dealId);
    // if (fromDeal === dealId) {
      editDealProfileField(dealId, field, value, (results) => {
        res.send(results)
      });
    // } else {
    //   res.status(401).end();
    // }
  });

  /**
   * Get the user data for a particular user ID
   */
  app.get("/user/:id", function(req, res) {
    console.log("HIT: get /user/" + req.params.id);
    var userId = req.params.id;
    // var fromUser = getUserIdFromToken(req.get('Authorization'));
    // if (fromUser === userid) {
    getUsersData([new ObjectID(userId)], function(err, wrappedUser) {
    // resolveDealObjects([new ObjectID(dealId)], function(err, wrappedDeal) {
      // extract deal from deal map (containing only this deal)
      var user = wrappedUser[0];
        if (err) {
          // A database error happened. Internal Error: 500.
          res.status(500).send("Database error: " + err);
        } else if (user === null) {
          // Couldn't find the user in the database.
          res.status(400).send("Could not look up user " + userId);
        } else {
          // Send data.
          res.send(user);
        }
      // }
    });
  });

  // `PUT /user/userId/field` value
  app.put("/user/:id/:field", function(req, res) {
    console.log("HIT: put /user/" + req.params.id + "/" + req.params.field);
    console.log(req.params.id);
    //var userId = new ObjectID(req.params.id);
    var userId = req.params.id;
    var field = req.params.field;
    var value = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    console.log(userId);
    console.log(fromUser);
    if (fromUser === userId) {
      console.log("Verification Success");
      editUserProfileField(new ObjectID(userId), field, value, (results) => {
        getUsersData([new ObjectID(userId)], function(err, wrappedUser){
          var user = wrappedUser[0];
            if (err) {
              res.status(500).send("Database error: " + err);
            } else if (user === null) {
              res.status(400).send("Could not look up user " + userId);
            } else {
              res.send(user);
            }
          });
      });
     } else {
       res.status(401).end();
     }
  });

  // TODO: FIX
  // `POST /search queryText`
  app.post('/search', function(req, res) {
    console.log("HIT: post /search")
    if (typeof(req.body) === 'string') {
      // trim() removes whitespace before and after the query.
      // toLowerCase() makes the query lowercase.
      var queryText = req.body.trim().toLowerCase();

      db.collection('deals').createIndex(
        {
          title: "text",
          link: "text"
          // don't currently work bc they are arrays-- need to fix this
          // description: "text",
          // tags: "text"
        }
      )

      console.log("past creating index");

        db.collection('users').find().toArray(function(err, users) {
          if (err) {
            return sendDatabaseError(res, err);
          }
          var openDealIdsArray = users.map((user) => {
            return user.openDeals;
          });
          var openDealIds = [].concat.apply([], openDealIdsArray);
          console.log("open deals: " + JSON.stringify(openDealIds));
          // Look for feed items within the feed that contain queryText.
          db.collection('deals').find({
            $or: openDealIds.map((id) => { return { _id: id  }}),
            $text: {
              $search: queryText
            }
          }).toArray(function(err, dealResults) {
            console.log("dealResults: " + JSON.stringify(dealResults));
            if (err) {
              return sendDatabaseError(res, err);
            }
            res.send(dealResults);
          });
        }); // end of db.collection
      } // end of if
      else {
        // 400: Bad Request.
        res.status(400).end();
      }
  });

  // `GET /user/userId/opendeals`
  app.get("/user/:id/opendeals", function(req, res) {
    console.log("HIT: get /user/" + req.params.id + "/opendeals");
    var userId = req.params.id;
    // var fromUser = getUserIdFromToken(req.get('Authorization'));
    // if (fromUser === userid) {
        getUsersData([new ObjectID(userId)], function(err, wrappedUser) {
        // // extract user from user map (containing only this user)
        var user = wrappedUser[0];
        if (err) {
          // A database error happened. Internal Error: 500.
          res.status(500).send("Database error: " + err);
        } else if (user === null) {
          // Couldn't find the user in the database.
          res.status(400).send("Could not look up user " + userId);
        } else {
          // Send data.
          res.send(user.openDeals);
        }
      // }
    });
  });

  // `GET /user/userId/closeddeals`
  app.get("/user/:id/closeddeals", function(req, res) {
    console.log("HIT: get /user/" + req.params.id + "/closeddeals");
    var userId = req.params.id;
    // var fromUser = getUserIdFromToken(req.get('Authorization'));
    // if (fromUser === userid) {
      getUsersData([new ObjectID(userId)], function(err, wrappedUser) {
        // // extract user from user map (containing only this user)
        var user = wrappedUser[0];
        if (err) {
          // A database error happened. Internal Error: 500.
          res.status(500).send("Database error: " + err);
        } else if (user === null) {
          // Couldn't find the user in the database.
          res.status(400).send("Could not look up user " + userId);
        } else {
          // Send data.
          res.send(user.closedDeals);
        }
      // }
    });
  });

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                                 DEPRECATED                                 //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

  // /**
  //  * Gets deals associated with a given tag
  //  */
  // app.get('/tag/:tagid', function(req, res) {
  //   var tag = req.params.tagid;
  //   res.send(getSearchResults(tag));
  // });

  // /**
  //  * Gets deals associated with a given tag
  //  */
  // app.get('/tag0/:tag0/tag1/:tag1/tag2/:tag2/tag3/:tag3/tag4/:tag4/', function(req, res) {
  //   var tags = [req.params.tag0.substring(1), req.params.tag1.substring(1), req.params.tag2.substring(1), req.params.tag3.substring(1), req.params.tag4.substring(1)];
  //   console.log(tags);
  //   getSearchResults(tags[0], function(err, deals) {
  //     if (err) {
  //       // A database error happened.
  //       // Internal Error: 500.
  //       res.status(500).send("Database error: " + err);
  //     } else if (deals === null) {
  //       // Couldn't find the feed in the database.
  //       res.status(400).send("Could not find tag: " + tags[0]);
  //     } else {
  //       //console.log(deals);
  //       // Send data.
  //       res.send(deals);
  //
  //     }
  //   });
  // });

  // /**
  //  * Gets deals associated with a given tag
  //  */
  // app.get('/tag0/:tag0/tag1/:tag1/tag2/:tag2/tag3/:tag3/tag4/:tag4/', function(req, res) {
  //   var tags = [req.params.tag0.substring(1), req.params.tag1.substring(1), req.params.tag2.substring(1), req.params.tag3.substring(1), req.params.tag4.substring(1)];
  //   // getSearchResults(tags[0], function(err, deals) {
  //     if (err) {
  //       // A database error happened.
  //       // Internal Error: 500.
  //       res.status(500).send("Database error: " + err);
  //     } else if (deals === null) {
  //       // Couldn't find the feed in the database.
  //       res.status(400).send("Could not find tag: " + tags[0]);
  //     } else {
  //       // console.log(deals);
  //       // Send data.
  //       res.send(deals);
  //     }
  //   });
  // });

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                            OTHER IMPORTANT STUFF                           //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

  /**
   * Resets the database!
   */
  app.post('/resetdb', function(req, res) {
    console.log("Resetting database...");
    // This is a debug route, so don't do any validation.
    ResetDatabase(db, function() {
      res.send();
    });
  });

  /**
   * Translate JSON Schema Validation failures into error 400s.
   */
  app.use(function(err, req, res, next) {
    if (err.name === 'JsonSchemaValidation') {
      // Set a bad request http response status
      res.status(400).end();
    } else {
      // It's some other sort of error; pass it to next error middleware handler
      next(err);
    }
  });

  // Starts the server on port 3000!
  app.listen(3000, function() {
    console.log('App listening on port 3000!');
  });
});
