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
            that.setState({ imgUrl: url, imgLoad: true, tryAgain: false });
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

export function pullMyPurchasesFromDatabase() {
	return new Promise((resolve, reject) => {
		let ref = firebase.database().ref('/Users/'+firebase.auth().currentUser.uid);
		ref.on('value', (snapshot) => {
			resolve(snapshot.child('myPurchases').val());
		});
	});
}

export function pullMyListingsFromDatabase() {
	return new Promise((resolve, reject) => {
		let ref = firebase.database().ref('/Users/'+firebase.auth().currentUser.uid);
		ref.on('value', (snapshot) => {
			resolve(snapshot.child('myListings').val());
		});
	});
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

export function editPostingToDatabase(id, description, title, price, imageFile, that) {
  var imageDatabaseRef = firebase.database().ref('/ListingImages/' + id);

  return imageDatabaseRef.once("value").then(function(snapshot) {
    var storageImageName = snapshot.val();
    var updateImageName = storageImageName;

    // If imageFile is not null, meaning that a file was imoprted
    if (imageFile != null) {

      // Once we know that there is an image file imported we can check the name of the file
      if (imageFile.name != storageImageName ) {
        updateImageName =  imageFile.name

        // Uploading your new image to firebase
        firebase.storage().ref().child(imageFile['name']).put(imageFile).then(function() {
        }).then(function() {
          // Removing old image and adding the new reference in
          imageDatabaseRef.remove().then(function() {
            imageDatabaseRef.set(imageFile.name);
          });
        }).catch(function(error) {
          // Handle Errors here.
          console.log('An error has occured while Updating your image in firebase storage')
          console.log(error.code)
          console.log(error.message)
        });
      }
    }

    // Adds new posting to database storage -> 'Listings'
    firebase.database().ref('/Listings/' + id).update({
      title: title,
      description: description,
      price: price,
      imageName: updateImageName
    }).catch(function(error) {
        // Handle Errors here.
        console.log('An error has occured while updating the listing in firebae')
        console.log(error.code)
        console.log(error.message)
    });
  }).catch(function(error) {
    // Handle Errors here.
    console.log('An error has occured while editting a post in firebase')
    console.log(error.code)
    console.log(error.message)
  });
}

export function pullUsersFromDatabase(that){
  var arrayUserList = []
  var currUser = {}

  firebase.database().ref('/Users/').once('value').then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      currUser = {
        fullName: childSnapshot.child('fullName').val(),
        userName: childSnapshot.child('userName').val(),
        email: childSnapshot.child('email').val(),
        myListings: childSnapshot.child('myListings').val(),
        myPurchases: childSnapshot.child('myPurchases').val(),
        photoId: childSnapshot.child('photoId').val(),
        password: childSnapshot.child('password').val(),
        wif: childSnapshot.child('wif').val(),
      }
      arrayUserList.push(currUser)

    });

		if(typeof arrayUserList !== 'undefined') {
			that.setState({ users: arrayUserList})
		}
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

export function registerUserToDatabase(fullName, userName, email, photoId, password, verifyPassword, wif) {
	return new Promise((resolve,reject) => {
		if (password != verifyPassword) {
	      	console.log('Passwords dont match')
	    } else {
	      	firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
	        	if (typeof photoId == 'undefined') {
	          		console.log('photoIsUndefined')
	          		photoId = 'defaultPhoto.png'
	        	}
	        firebase.database().ref('/Users/').once('value').then(() => {
	          	var newUser = {
	            	fullName: fullName,
	            	userName: userName,
	            	email: email,
	            	myListings: '',
	            	myPurchases: '',
	            	photoId: photoId,
	            	password: password,
	            	wif: wif
	          	}
	          	firebase.database().ref('/Users/' + user.uid).set(newUser);
	  			resolve(user.uid);

	        }).catch(function(error) {
	        // Handle Errors here.
	        	console.log('An error has occured while creating the user via Firebase: ')
	        	console.log(error.code)
	        	console.log(error.message)
				reject(error);
	      });

	      }).catch(function(error) {
	        // Handle Errors here.
        		console.log('An error has occured while registering the user via Firebase: ')
	        	console.log(error.code)
	        	console.log(error.message)
				reject(error);
	      });
	    }
	})
}

export function deletePosting(id, that) {
  return firebase.database().ref('/Listings/' + id).remove().then(function() {
    firebase.database().ref('/ListingImages/' + id).remove()
  }).catch(function(error) {
    // Handle Errors here.
    console.log('An error has occured while removing a listing: ')
    console.log(error.code)
    console.log(error.message)
  })
}

export function loginUser(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
    console.log('User: ' + email + ' has been sucessfully logged in')
    return user
  }).catch(function(error) {
    // Handle Errors here.
    console.log('An error has occured while logging in the user via Firebase: ')
    console.log(error.code)
    console.log(error.message)
  });
}

export function logoutUser(){
  firebase.auth().signOut().then(function() {
    console.log('User was logged out successfullly')
  }).catch(function(error) {
    console.log('An error has occured while logging out the user via Firebase: ')
    console.log(error.code)
    console.log(error.message)
  });
}
