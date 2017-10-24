var token = 'eyJpZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSJ9';

/**
 * Properly configure+send an XMLHttpRequest with error handling, authorization token,
 * and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  // The below comment tells ESLint that PairdError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global PairdError */

  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      PairdError('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    PairdError('Could not ' + verb + " " + resource + ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    PairdError('Could not ' + verb + " " + resource + ": Request timed out.");
  });

  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}

/**
 * Given a deal ID, returns the corresponding Deal object with references
 * resolved.
 * @param dealId The deal ID.
 * @param cb The function to be executed upon retrieval of the Deal object.
 */
export function getDealData(dealId, cb) {
  sendXHR('GET', '/deal/' + dealId, undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * Given an array of deal IDs, returns an array containing the Deal objects
 * associated with those IDs (with references resolved).
 * @param dealIds The array of deal IDs.
 * @param cb The function to be executed upon retrieval of the Deal objects.
 */
export function getDealsData(dealIds, cb) {
  sendXHR('GET', '/deals/' + dealIds, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * Update value of field in deal profile.
 * @param dealId The ID of the deal being edited.
 * @param field The field in the deal document to be edited.
 * @param value The edited value of the field.
 * @param cb The function to be executed upon completion of the edit.
 */
export function editDealProfileField(dealId, field, value, cb) {
  sendXHR('PUT','/deal/' + dealId + '/' + field, value, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

/**
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
 * @param cb The function to be executed upon completion of the post.
 */
export function postDeal(userId, title, description, price, link, expiration, imagePath, tags, cb) {
  var minPrice = parseInt(price);
  var newTags = tags.split(",");
  sendXHR('POST', '/deal', {
    owner: userId,
    title: title,
    description: description,
    minPrice: minPrice,
    link: link,
    expDate: expiration,
    imagePath: imagePath,
    tags: newTags
  }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * Pair a user to existing deal owned by another user. Update deal and user
 * documents accordingly.
 * @param dealId The ID of the existing deal.
 * @param paireeId The user who is electing to participate in the deal.
 * @param cb The function to be executed upon completion of the pairing.
 */
export function pairUser(dealId, paireeId, cb) {
  sendXHR('PUT', '/deal/' + dealId, JSON.parse('{"paireeId" : "' + paireeId + '"}'), (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * Given a user ID, returns the corresponding User object with references
 * resolved.
 * @param userId The user ID.
 * @param cb The function to be executed upon retrieval of the User object.
 */
export function getUserData(userId, cb) {
  // We don't need to send a body, so pass in 'undefined' for the body.
  sendXHR('GET', '/user/' + userId, undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * Update value of field in user profile.
 * @param userId The ID of the user being edited.
 * @param field The field in the user document to be edited.
 * @param value The edited value of the field.
 * @param cb The function to be executed upon completion of the edit.
 */
export function editUserProfileField(userId, field, value, cb) {
  sendXHR('PUT', '/user/' + userId + '/' + field, value, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * Searches for feed items with the given text.
 * @param userId
 * @param queryText
 * @param cb
 * --> "filter" is like "map" in that it is a magic method for arrays. It takes
 * an anonymous function, which it calls with each item in the array. If that
 * function returns 'true', it will include the item in a return array.
 * Otherwise, it will not. Here, we use filter to return only feedItems that
 * contain the query text. Since the array contains feed item IDs, we later map
 * the filtered IDs to actual feed item objects.
 * --> trim() removes whitespace before and after the query.
 * --> toLowerCase() makes the query lowercase.
 */
export function searchForDeals(queryText, cb) {
  sendXHR('POST', '/search', queryText, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * Emulates a REST call to get the open deals data for a particular user.
 * @param userId The user ID.
 * @param cb The function to be executed upon retrieval of the open Deals objects.
 */
export function getOpenDealsData(userId, cb) {
  sendXHR('GET', '/user/' + userId + '/opendeals', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * Emulates a REST call to get the closed deals data for a particular user.
 * @param userId The user ID.
 * @param cb The function to be executed upon retrieval of the closed Deals objects.
 */
export function getClosedDealsData(userId, cb) {
  sendXHR('GET', '/user/' + userId + '/closeddeals', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
