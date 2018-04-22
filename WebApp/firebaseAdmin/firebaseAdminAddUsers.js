/*
  Title - firebaseAdminAddUsers.js
  Author - Nicholas Cheung

  This script gives the user the ability to add additional users using admin privileges.

  To run this script you must pass in a text file to be read from command line
  Example run:
       node firebaseAdminAddUsers.js --read_json <text_file_name>.text

  NOTES - When you pass in a text file please make sure that the json is formatted correctly and that there is no additional empty lines after the last json user. 
        - If you need an example of a text file, there is a default text file with default users called - defaultUsers.text
*/

var admin = require('firebase-admin');

var serviceAccount = require('../firebaseAdmin/credentialJSON.js');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://neo-market-8a303.firebaseio.com"
});

function grab(flag) {
  // Function is for grabing command line arguements
  var index = process.argv.indexOf(flag);
  return (index === -1) ? null : process.argv[index+1]  

}

function isUserRegisterd(userName, userList) {
  for(var i = 0; i<userList.length; i++) {
    if(userName == userList[i]){
      return true
    }
  }
  return false
}

function setupFunction(){
  var db = admin.database();
  var rootRef = db.ref();
  var promise = rootRef.child('/Users/').once('value', function(snapshot) {
    if(!snapshot.exists()) {
      console.log('There is no users section in the database, going to create one.')
      admin.database().ref('/Users/' + 'placeholderUser').set('defaultUser')
    }
  });
  return promise
}

function fireBaseExit(){
  // Library function call to end firebase node process 
  admin.app().delete()
}

function fireBaseAddUsers(){
  var read_json = grab('--read_json');
  var db = admin.database();
  var ref = db.ref("/Users/");
  
  if (!read_json) {
    console.log('Please pass a file for the script to read')
  } else {
    var fs = require('fs');
    var readtext = fs.readFileSync(read_json, 'utf8');
    var split_json = readtext.split('\n')

    ref.once("value", function(snapshot) { 
      var userIndex = 0;
      var userListLength = Object.keys(split_json).length-1;
      while(userIndex<=userListLength){
        try {
          var curr_user = JSON.parse(split_json[userIndex])
          var userNameList = Object.keys(snapshot.val())
          if(!isUserRegisterd(curr_user['userName'], userNameList)){
            if(userIndex == userListLength) {
              admin.database().ref('/Users/' + curr_user['userName']).set(curr_user).then(() => fireBaseExit());
            } else {
              admin.database().ref('/Users/' + curr_user['userName']).set(curr_user);
            }
            console.log('The user ' + curr_user['userName'] + ' was added to the database')
          } else {
            console.log('The user ' + curr_user['userName'] + ' is already in the database. Therefore, skipping this user.')
            if(userIndex == userListLength) {
              fireBaseExit()
            }
          }
        } catch(err) {
          console.log('There was a problem parsing the JSON, please double check that the user json is formatted correctly.')
          console.log(err)
          fireBaseExit()
        }
        userIndex++;
      }

      if(snapshot.child('placeholderUser').exists()){
        admin.database().ref('/Users/placeholderUser/').remove().then(() => fireBaseExit())
        console.log('Removing extra placeholder')
      }
    });
  }
}

function main() {
  setupFunction().then(() => fireBaseAddUsers());
}

main()

