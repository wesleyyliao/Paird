var initialData = {
  "users": {
    "1": {
      "_id": 1,
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
      "openDeals": [2,5],
      "closedDeals": [1,3,4]
    },
    "2": {
      "_id": 2,
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
      "openDeals": [6,7],
      "closedDeals": [1,3,4]
    }
  },
  "deals": {
    "1": {
      "_id": 1,
      "owner": 2,
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
      "pairee": 1,
      "tags": [
        "swim"
      ]
    },
    "2": {
      "_id": 2,
      "owner": 1,
      "title": "Macy's Spend $40, Save $10",
      "imagePath": "img/exampleDeal1B.jpg",
      "description": [
          "Spend $40 to save $10",
          "Promo Code KIDS"
      ],
      "minPrice": 10.00,
      "link": "https://www.macys.com/",
      "postDate": 1454392800,
      "expDate": 1456120800,
      "tags": [
        "swim"
      ]
    },
    "3": {
      "_id": 3,
      "owner": 2,
      "title": "American Eagle Free Shipping & 50% Off Deal",
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
      "pairee": 1,
      "tags": [
        "women",
        "jeans"
      ]
    },
    "4": {
      "_id": 4,
      "owner": 1,
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
      "pairee": 2,
      "tags": [
        "jeans"
      ]
    },
    "5": {
      "_id": 5,
      "owner": 1,
      "title": "JCrew Free Shipping With $50+ Purchase",
      "imagePath": "img/exampleDeal7B.jpg",
      "description": [
          "Free shipping on $50+ orders",
          "Separate deal - 50% off all items",
          "To pair, must spend at least $10"
      ],
      "minPrice": 10.00,
      "link": "https://www.jcrew.com/",
      "postDate": 1457551028,
      "expDate": 1458120800,
      "tags": [
        "women"
      ]
    },
    "6": {
      "_id": 6,
      "owner": 2,
      "title": "Victoria's Secret Free 2-Day Shipping on $100 Purchase",
      "imagePath": "img/exampleDeal8B.jpg",
      "description": [
          "Free 2-Day shipping on $100+ orders",
          "Promo code SHIP2DAY",
          "To pair, must spend at least $10"
      ],
      "minPrice": 10.00,
      "link": "https://www.victoriassecret.com/",
      "postDate": 1457551028,
      "expDate": 1458120800,
      "tags": [
        "women",
        "swim"
      ]
    },
    "7": {
      "_id": 7,
      "owner": 2,
      "title": "American Eagle BOGO Jeans",
      "imagePath": "img/exampleDeal9B.jpg",
      "description": [
          "All AEO Jeans buy one get one 50% off",
          "Excludes clearance",
          "To pair, must spend at least $10"
      ],
      "minPrice": 10.00,
      "link": "https://www.ae.com/",
      "postDate": 1457551028,
      "expDate": 1458120800,
      "tags": [
        "women",
        "jeans"
      ]
    }
  },
  "tags": {
    "1": {
      "id": "women",
      "deals": [3,5,6,7]
    },
    "2": {
      "id": "jeans",
      "deals": [3,4,7]
    },
    "3": {
      "id": "swim",
      "deals": [1,2,6]
    }
  }
};

var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function readDocumentForTags(tag){
   for(var i = 1; i <= Object.keys(data['tags']).length; i++){
     if(data['tags'][i].id === tag){
       return JSONClone(data['tags'][i]);
     }
   }
}
module.exports.readDocumentForTags = readDocumentForTags;
/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/** go through all users **/
function readDocumentForUsers() {
  // window.alert(JSON.stringify(Object.keys(data['users'])));
  return Object.keys(data['users']).map((userId) => {
    return readDocument('users', parseInt(userId, 10))
  });
}
module.exports.readDocumentForUsers = readDocumentForUsers;

/** go through all deals **/
function readDocumentForDeals(){
  // window.alert(JSON.stringify(Object.keys(data['users'])));
  return Object.keys(data['deals']).map((dealId) => {
    return readDocument('deals', parseInt(dealId, 10))
  });
}
module.exports.readDocumentForDeals = readDocumentForDeals;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
