var ObjectID = require('mongodb').ObjectID;

var databaseName = "paird";

var initialData = {
    "users": {
      "1": {
        "_id": new ObjectID("000000000000000000000001"),
        "fullName": "Abu",
        "imagePath": "img/abu.jpg",
        "email": "holme22e@mtholyoke.edu",
        "billingInfo": {
          "billName": "Ella Holmes",
          "street": "5844 South Oak Street",
          "city": "San Diego",
          "USstate": "CA",
          "country": "USA",
          "zip": "92122",
          "phone": "9874440892"
        },
        "shippingInfo": {
          "street": "5844 South Oak Street",
          "city": "San Diego",
          "USstate": "CA",
          "country": "USA",
          "zip": "92122",
          "phone": "9874440892"
        },
        "paymentInfo": {
          "type": "debit",
          "routingNumber": "343434343",
          "cardType": "Visa",
          "cardID": "XXXX-XXXX-XXXX-5567"
        },
        "currentLocation": {
          "city": "San Diego",
          "USstate": "CA"
        },
        "openDeals": [new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000005"), new ObjectID("000000000000000000000008"), new ObjectID("000000000000000000000009"), new ObjectID("000000000000000000000010"), new ObjectID("000000000000000000000011"), new ObjectID("000000000000000000000012"), new ObjectID("000000000000000000000013")],
        "closedDeals": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000003"), new ObjectID("000000000000000000000004")]
      },
      "2": {
        "_id": new ObjectID("000000000000000000000002"),
        "fullName": "Sleeping Beauty",
        "imagePath": "img/sleeping-beauty.jpg",
        "email": "klein23h@mtholyoke.edu",
        "billingInfo": {
          "billName": "Helena Kleinschmidt",
          "street": "200 W. 89th Street",
          "city": "New York",
          "USstate": "NY",
          "country": "USA",
          "zip": "10024",
          "phone": "2127890892"
        },
        "shippingInfo": {
          "street": "11 Madison Avenue",
          "city": "New York",
          "USstate": "NY",
          "country": "USA",
          "zip": "10010",
          "phone": "2122223423"
        },
        "paymentInfo": {
          "type": "credit",
          "routingNumber": "909090909",
          "cardType": "MasterCard",
          "cardID": "XXXX-XXXX-XXXX-0099"
        },
        "currentLocation": {
          "city": "New York",
          "USstate": "NY"
        },
        "openDeals": [new ObjectID("000000000000000000000006"), new ObjectID("000000000000000000000007"), new ObjectID("000000000000000000000014"), new ObjectID("000000000000000000000015"), new ObjectID("000000000000000000000017"), new ObjectID("000000000000000000000018")],
        "closedDeals": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000003"), new ObjectID("000000000000000000000004")]
      }
    },
    "deals": {
      "1": {
        "_id": new ObjectID("000000000000000000000001"),
        "owner": new ObjectID("000000000000000000000002"),
        "title": "Target Free Shipping & 20% Off Deal",
        "imagePath": "img/exampleDeal3B.jpg",
        "description": [
            "Free shipping on $25+ orders",
            "Separate deal - 20% off entire purchase!",
            "To pair, must spend at least $10"
        ],
        "minPrice": 10.00,
        "link": "https://www.target.com/",
        "postDate": 1454392800,
        "expDate": 1459818000,
        "pairee": new ObjectID("000000000000000000000001")
      },
      "2": {
        "_id": new ObjectID("000000000000000000000002"),
        "owner": new ObjectID("000000000000000000000001"),
        "title": "Macy's Spend $40, Save $10",
        "imagePath": "img/exampleDeal1B.jpg",
        "description": [
            "Spend $40 to save $10",
            "Promo Code KIDS"
        ],
        "minPrice": 10.00,
        "link": "https://www.macys.com/",
        "postDate": 1454392800,
        "expDate": 1456120800
      },
      "3": {
        "_id": new ObjectID("000000000000000000000003"),
        "owner": new ObjectID("000000000000000000000002"),
        "title": "Am. Eagle Free Shipping & 50% Off Deal",
        "imagePath": "img/exampleDeal2B.jpg",
        "description": [
            "Free shipping on $25+ orders",
            "Separate deal - 50% off clearance items",
            "To pair, must spend at least $10",
            "FYI, there’s lots of swimwear on clearance!"
        ],
        "minPrice": 10.00,
        "link": "https://www.ae.com/",
        "postDate": 1457551028,
        "expDate": 1458120800,
        "pairee": new ObjectID("000000000000000000000001")
      },
      "4": {
        "_id": new ObjectID("000000000000000000000004"),
        "owner": new ObjectID("000000000000000000000001"),
        "title": "Old Navy Extra 30% Off on Purchase of 3",
        "imagePath": "img/exampleDeal6B.jpg",
        "description": [
            "Kids Clothing-- Extra 30% off on purchase of 3",
            "Extra 15% off on purchase of 2",
            "To pair, must spend at least $10"
        ],
        "minPrice": 10.00,
        "link": "https://www.oldnavy.com/",
        "postDate": 1457551028,
        "expDate": 1458120800,
        "pairee": new ObjectID("000000000000000000000002")
      },
      "5": {
        "_id": new ObjectID("000000000000000000000005"),
        "owner": new ObjectID("000000000000000000000001"),
        "title": "JCrew Free Shipping With $50+ Purchase",
        "imagePath": "img/jcrew.jpg",
        "description": [
            "Free shipping on $50+ orders",
            "Separate deal - 50% off all items",
            "To pair, must spend at least $10"
        ],
        "minPrice": 10.00,
        "link": "https://www.jcrew.com/",
        "postDate": 1457551028,
        "expDate": 1458120800
      },
      "6": {
        "_id": new ObjectID("000000000000000000000006"),
        "owner": new ObjectID("000000000000000000000002"),
        "title": "Victoria's Secret Free 2-Day Shipping on $100 Purchase",
        "imagePath": "img/victoriassecret_dark.jpg",
        "description": [
            "Free 2-Day shipping on $100+ orders",
            "Promo code SHIP2DAY",
            "To pair, must spend at least $10"
        ],
        "minPrice": 10.00,
        "link": "https://www.victoriassecret.com/",
        "postDate": 1457551028,
        "expDate": 1458120800
      },
      "7": {
        "_id": new ObjectID("000000000000000000000007"),
        "owner": new ObjectID("000000000000000000000002"),
        "title": "Am. Eagle BOGO Jeans",
        "imagePath": "img/americaneagle_jeans.jpg",
        "description": [
            "All AEO Jeans buy one get one 50% off",
            "Excludes clearance",
            "To pair, must spend at least $10"
        ],
        "minPrice": 10.00,
        "link": "https://www.ae.com/",
        "postDate": 1457551028,
        "expDate": 1458120800
      },
      "8": {
        "_id": new ObjectID("000000000000000000000008"),
        "owner": new ObjectID("000000000000000000000001"),
        "title": "Bath and Bodyworks (jeans)",
        "imagePath": "img/bathandbodyworks.jpg",
        "description": [
            "text"
        ],
        "minPrice": 10.00,
        "link": "https://www.bathandbodyworks.com/",
        "postDate": 1457551028,
        "expDate": 1458120800
      },
      "9": {
        "_id": new ObjectID("000000000000000000000009"),
        "owner": new ObjectID("000000000000000000000001"),
        "title": "Bed, Bath & Beyond (eagle)",
        "imagePath": "img/bedbathbeyond.jpg",
        "description": [
            "text"
        ],
        "minPrice": 10.00,
        "link": "https://www.bedbathandbeyond.com/",
        "postDate": 1457551028,
        "expDate": 1458120800
      },
      "10": {
        "_id": new ObjectID("000000000000000000000010"),
        "owner": new ObjectID("000000000000000000000001"),
        "title": "Costco Diapers (eagle)",
        "imagePath": "img/costco_diapers.jpg",
        "description": [
            "text"
        ],
        "minPrice": 10.00,
        "link": "https://www.costco.com/",
        "postDate": 1457551028,
        "expDate": 1458120800
      },
      "11": {
        "_id": new ObjectID("000000000000000000000011"),
        "owner": new ObjectID("000000000000000000000001"),
        "title": "Domino's Pizza (jeans)",
        "imagePath": "img/dominos_pizza.jpg",
        "description": [
            "text"
        ],
        "minPrice": 10.00,
        "link": "https://www.dominos.com/",
        "postDate": 1457551028,
        "expDate": 1458120800
      },
      "12": {
        "_id": new ObjectID("000000000000000000000012"),
        "owner": new ObjectID("000000000000000000000001"),
        "title": "Eastern Mountain Sports (eagle)",
        "imagePath": "img/easternMountainSports.jpg",
        "description": [
            "text"
        ],
        "minPrice": 10.00,
        "link": "https://www.ems.com/",
        "postDate": 1457551028,
        "expDate": 1458120800
      },
      "13": {
        "_id": new ObjectID("000000000000000000000013"),
        "owner": new ObjectID("000000000000000000000001"),
        "title": "Ebay Solar Panels (secret)",
        "imagePath": "img/ebaySolarPanels.jpg",
        "description": [
            "text"
        ],
        "minPrice": 10.00,
        "link": "https://www.ebay.com/",
        "postDate": 1457551028,
        "expDate": 1458120800
      },
      "14": {
        "_id": new ObjectID("000000000000000000000014"),
        "owner": new ObjectID("000000000000000000000002"),
        "title": "Kate Spade (jeans)",
        "imagePath": "img/kateSpade.jpg",
        "description": [
            "text"
        ],
        "minPrice": 10.00,
        "link": "https://www.katespade.com/",
        "postDate": 1457551028,
        "expDate": 1458120800
      },
      "15": {
        "_id": new ObjectID("000000000000000000000015"),
        "owner": new ObjectID("000000000000000000000002"),
        "title": "Sephora (secret)",
        "imagePath": "img/sephora.jpg",
        "description": [
            "text"
        ],
        "minPrice": 10.00,
        "link": "https://www.sephora.com/",
        "postDate": 1457551028,
        "expDate": 1458120800
      },
      "17": {
        "_id": new ObjectID("000000000000000000000017"),
        "owner": new ObjectID("000000000000000000000002"),
        "title": "Victoria's 2-Day Shipping Swimwear (secret)",
        "imagePath": "img/victoriassecret_swim.jpg",
        "description": [
            "text"
        ],
        "minPrice": 10.00,
        "link": "https://www.victoriassecret.com/",
        "postDate": 1457551028,
        "expDate": 1458120800
      },
      "18": {
        "_id": new ObjectID("000000000000000000000018"),
        "owner": new ObjectID("000000000000000000000002"),
        "title": "Wild About Birds (secret)",
        "imagePath": "img/wildAboutBirds.jpg",
        "description": [
            "text"
        ],
        "minPrice": 10.00,
        "link": "https://www.wildaboutbirds.com/",
        "postDate": 1457551028,
        "expDate": 1458120800
      }
    },
    "tags": {
      "1": {
        "id": "women",
        "deals": [new ObjectID("000000000000000000000001")]
      },
      "2": {
        "id": "jeans",
        "deals": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003")]
      },
      "3": {
        "id": "swim",
        "deals": [new ObjectID("000000000000000000000001")]
      }
    }
  };

  /**
   * Resets a collection.
   */
  function resetCollection(db, name, cb) {
    // Drop / delete the entire object collection.
    db.collection(name).drop(function() {
      // Get all of the mock objects for this object collection.
      var collection = initialData[name];
      var objects = Object.keys(collection).map(function(key) {
        return collection[key];
      });
      // Insert objects into the object collection.
      db.collection(name).insertMany(objects, cb);
    });
  }

  /**
   * Reset the MongoDB database.
   * @param db The database connection.
   */
  function resetDatabase(db, cb) {
    // The code below is a bit complex, but it basically emulates a
    // "for" loop over asynchronous operations.
    var collections = Object.keys(initialData);
    var i = 0;

    // Processes the next collection in the collections array.
    // If we have finished processing all of the collections,
    // it triggers the callback.
    function processNextCollection() {
      if (i < collections.length) {
        var collection = collections[i];
        i++;
        // Use myself as a callback.
        resetCollection(db, collection, processNextCollection);
      } else {
        cb();
      }
    }

    // Start processing the first collection!
    processNextCollection();
  }

  // Check if called directly via 'node', or required() as a module.
  // http://stackoverflow.com/a/6398335
  if(require.main === module) {
    // Called directly, via 'node src/resetdatabase.js'.
    // Connect to the database, and reset it!
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/' + databaseName;
    MongoClient.connect(url, function(err, db) {
      if (err) {
        throw new Error("Could not connect to database: " + err);
      } else {
        console.log("Resetting database...");
        resetDatabase(db, function() {
          console.log("Database reset!");
          // Close the database connection so NodeJS closes.
          db.close();
        });
      }
    });
  } else {
    // require()'d.  Export the function.
    module.exports = resetDatabase;
  }
