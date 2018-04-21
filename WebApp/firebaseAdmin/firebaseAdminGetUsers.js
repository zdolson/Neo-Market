var admin = require('firebase-admin');

var serviceAccount = require('../firebaseAdmin/credentialJSON.js');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://neo-market-8a303.firebaseio.com"
});

function main() {
  var db = admin.database();
  var ref = db.ref("/Users/");
  ref.once("value", function(snapshot) {
    console.log(snapshot.val());
  });
}

main();
