import React from 'react'

import * as firebase from 'firebase'

export function initializeApp() {
	const config = {
	  apiKey: "AIzaSyAm2AxvW9dp_lAsP_hvgAUYnGWKGro8L00",
	  authDomain: "neo-market-8a303.firebaseapp.com",
	  databaseURL: "https://neo-market-8a303.firebaseio.com",
	  projectId: "neo-market-8a303",
	  storageBucket: "neo-market-8a303.appspot.com",
	  messagingSenderId: "1035941360979"
	};

	if (!firebase.apps.length) {
	    firebase.initializeApp(config);
	}
}

export function pullingDatabaseImage(id, imgUrl, imgLoad, tryAgain, that) {
	if(tryAgain && !imgLoad){
    var fireBaseDatabaseRef = firebase.database().ref('/ListingImages/');
    fireBaseDatabaseRef.on('value', function(snapshot) {
      var keys = Object.keys(snapshot.val())
      for(var i=0; i<keys.length;i++){
        if(id == keys[i]){
          var ref = firebase.storage().ref(snapshot.child(id).val());
          ref.getDownloadURL().then(url => {
            that.setState({ imgUrl: url, imgLoad: true });
          }).catch(err => {
            console.error(err)
            that.setState({tryAgain: true})
          });
        }
      }
    })
  }
}

function isInItemList(id, listOfItems) {
  for(var i = 0; i<listOfItems.length; i++) {
    if(id == listOfItems[i]['id']) {
      return true
    }
  }
  return false
}

export function pullDataFromDatabase(that) {
  var arrayItemList = []
  var currItem = {}

  var fireBaseDatabaseRef = firebase.database().ref('/Listings/');
  fireBaseDatabaseRef.on('value', function(snapshot) {
    snapshot.forEach((childSnapshot) => {
      if(!isInItemList(childSnapshot.child('id').val(), that.state.items)){
        currItem = {
          id: childSnapshot.child('id').val(),
          owner: childSnapshot.child('owner').val(),
          title: childSnapshot.child('title').val(),
          description: childSnapshot.child('description').val(),
          price: childSnapshot.child('price').val(),
          amount: childSnapshot.child('amount').val(),
        }

        arrayItemList.push(currItem)
      }
    })

    // First pass will usually be undefined so we have to account for it.
    if(typeof arrayItemList !== 'undefined') {
      that.setState({ items: arrayItemList})
    }
  })
}

export function postNewPostingToDatabase(id, owner, title, description, price, amount, imageFile) {
  // Adds new photo to firebase storage
  var ref = firebase.storage().ref().child(imageFile['name']);
  ref.put(imageFile).then(function(snapshot) {
    console.log('Uploaded a blob or file!');

    // Adds new posting ID to databse storage -> 'ListingImages'
    firebase.database().ref('/ListingImages/' + id).set(imageFile['name']);

    // Adds new posting to database storage -> 'Listings'
    firebase.database().ref('/Listings/' + id).set({
      id: id,
      owner: owner,
      title: title,
      description: description,
      price: price,
      amount: amount,
      imageName: imageFile['name']
    });
  });
}

export function pullUsersFromDatabase(that){
  var arrayUserList = []
  var currUser = {}

  firebase.database().ref('/Users/').once('value').then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      currUser = {
        wif: childSnapshot.child('wif').val(),
        email: childSnapshot.child('email').val(),
        firstName: childSnapshot.child('firstName').val(),
        lastName: childSnapshot.child('lastName').val(),
        password: childSnapshot.child('password').val(),
        userName: childSnapshot.child('userName').val()
      }
      arrayUserList.push(currUser)

      if(typeof arrayUserList !== 'undefined') {
        that.setState({ users: arrayUserList})
      }

    })
  }).catch(err => {
    console.error(err)
  });
}

function isUserRegisterd(userName, userList) {
  for(var i = 0; i<userList.length; i++) {
    if(userName == userList[i]){
      return true
    }
  }
  return false
}

export function registerUserToDatabase(wif, firstName, lastName, password, email, userName, that) {
  firebase.database().ref('/Users/').once('value').then((snapshot) => {
    var newUser = {
      wif: wif,
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      userName: userName
    }
    var userNameList = Object.keys(snapshot.val())
    if(!isUserRegisterd(userName, userNameList)){
      firebase.database().ref('/Users/' + userName).set(newUser);
      that.setState({users: that.state.users.concat(newUser)})

      //Add users to firebase database auth
      firebase.auth().createUserWithEmailAndPassword(email, password).then(console.log('Created user successfully')).catch(function(error) {
        // Handle Errors here.
        console.log('An error has occured while creating the user via Firebase: ')
        console.log(error.code)
        console.log(error.message)
      });
    }
  })
}

export function loginUser(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
    console.log('User: ' + email + ' has been sucessfully logged in')

  }).catch(function(error) {
    // Handle Errors here.
    console.log('An error has occured while logging in the user via Firebase: ')
    console.log(error.code)
    console.log(error.message)
  });
}

export function logoutUser(email, password){
  firebase.auth().signOut().then(function() {
    console.log('User: ' + email + ' was logged out successfullly')
  }).catch(function(error) {
    console.log('An error has occured while logging out the user via Firebase: ')
    console.log(error.code)
    console.log(error.message)
  });
}
