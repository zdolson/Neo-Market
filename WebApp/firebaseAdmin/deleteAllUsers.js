var admin = require('firebase-admin');

var serviceAccount = require('../firebaseAdmin/credentialJSON.js');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://neo-market-8a303.firebaseio.com"
});


function deleteUserAuth(uid) {
  admin.auth().deleteUser(uid)
    .then(function() {
      console.log("Successfully deleted user");
    })
    .catch(function(error) {
      console.log("Error deleting user:", error);
    });
}


function deleteUserDB(uid) {
  admin.database().ref('/Users').remove()
    .then(() => {
      console.log('success deleting all users from database');
    })
    .catch(err => {
      console.error('error deleteing users from db: ', err.message);
    })
}


function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        deleteUserAuth(userRecord.uid);
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken)
      }
    })
    .catch(function(error) {
      console.log("Error listing users:", error);
    });
}

// Start listing users from the beginning, 1000 at a time.
deleteUserDB();
listAllUsers();
