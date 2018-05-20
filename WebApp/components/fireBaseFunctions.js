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
	return new Promise((resolve,reject) => { 
    var currUserID = firebase.auth().currentUser.uid
    firebase.database().ref('/Users/' + currUserID).once('value').then((snapshot) => {
      resolve(snapshot.child('myListings').val());
    }).catch(function(error) {
      console.log('An error occured while pulling myListings from firebase');
      console.log(error.code);
      console.log(error.message);
      reject(error);
    })
  })
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

export function postNewPostingToDatabase(id, owner, title, description, price, amount, imageFile, that) {
  return new Promise((resolve, reject) => {
    firebase.storage().ref().child(imageFile['name']).put(imageFile).then(function(snapshot) {
      console.log('Uploaded a blob or file!');

      // Adds new posting ID to databse storage -> 'ListingImages'
      firebase.database().ref('/ListingImages/' + id).set(
        imageFile['name']
      ).catch(function(error) {
        console.log('An error occured while adding the image name to the imageListing path in firebase');
        console.log(error.code);
        console.log(error.message);
        reject(error);
      });

      // Adds new posting to database storage -> 'Listings'
      firebase.database().ref('/Listings/' + id).set({
        id: id,
        owner: owner,
        title: title,
        description: description,
        price: price,
        amount: amount,
        imageName: imageFile['name']
      }).catch(function(error) {
        console.log('An error occured while saving the posting to listings in firebase');
        console.log(error.code);
        console.log(error.message);
        reject(error);
      });

      var currUserID = firebase.auth().currentUser.uid
      firebase.database().ref('/Users/' + currUserID).once('value').then((snapshot) => {
        if (snapshot.child('myListings').val() == '') {
          var myListingsList = id
          console.log(myListingsList)
        } else {
          var myListingsList = snapshot.child('myListings').val().split(',')
          myListingsList.push(id)
          myListingsList = myListingsList.toString();
          console.log(myListingsList)
        }
        firebase.database().ref('/Users/' + currUserID).update({
          'myListings': myListingsList
        }).catch(function(error) {
          console.log('An error occured while updating the myListings field');
          console.log(error.code);
          console.log(error.message);
          reject(error);
        })
      }).catch(function(error) {
        console.log('An error occured while adding to myListingField');
        console.log(error.code);
        console.log(error.message);
        reject(error);
      })
      resolve(id);
    }).catch(function(error) {
      console.log('An error occured while posting image to storage');
      console.log(error.code);
      console.log(error.message);
      reject(error);
    });
  })
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

export function pullUserData(that) {
	return new Promise((resolve, reject) => {
		let ref = firebase.database().ref('/Users/'+firebase.auth().currentUser.uid);
		ref.on('value', (snapshot) => {
			resolve(snapshot.val());
		}).catch((err) => {
			reject(err);
		});
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

export function registerUserToDatabase(fullName, userName, email, photoId, password, verifyPassword, wif, that) {
	return new Promise((resolve,reject) => {
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
        that.setState({
          registerError: true,
          registerErrorMessage: error.message
        });
		  	reject(error);
      });

    }).catch(function(error) {
        // Handle Errors here.
    		console.log('An error has occured while registering the user via Firebase: ')
      	console.log(error.code)
      	console.log(error.message)
        that.setState({
          registerError: true,
          registerErrorMessage: error.message
        })
		reject(error);
    });
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

export function getMyListings(that) {
  return new Promise((resolve,reject) => { 
    var currUserID = firebase.auth().currentUser.uid
    firebase.database().ref('/Users/' + currUserID).once('value').then((snapshot) => {
      if (snapshot.child('myListings').val() == '') {
        that.setState({myListings: []})
      } else {
        that.setState({myListings: (snapshot.child('myListings').val()).split(',')})
      }
      resolve(snapshot.child('myListings').val());
    }).catch(function(error) {
      console.log('An error occured while pulling myListings from firebase');
      console.log(error.code);
      console.log(error.message);
      reject(error);
    })
  })
}

export function loginUser(email, password, that) {
  return firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
    console.log('User: ' + email + ' has been sucessfully logged in')
    return user
  }).catch(function(error) {
    // Handle Errors here.
    console.log('An error has occured while logging in the user via Firebase: ')
    console.log(error.code)
    console.log(error.message)
    that.setState({
      loginErrorMessage: error.message,
      loginError: true
    })
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
