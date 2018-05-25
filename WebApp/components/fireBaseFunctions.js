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

export function pullDataFromDatabase(that) {
  var arrayItemList = []
  var nonPurchasedList = []
  var currItem = {}

  return new Promise((resolve,reject) => { 
    firebase.database().ref('/Listings/').once('value').then(function(snapshot) {
      snapshot.forEach((childSnapshot) => {
        if(!isInItemList(childSnapshot.child('id').val(), that.state.items)){
          currItem = {
            id: childSnapshot.child('id').val(),
            owner: childSnapshot.child('owner').val(),
            title: childSnapshot.child('title').val(),
            description: childSnapshot.child('description').val(),
            price: childSnapshot.child('price').val(),
            amount: childSnapshot.child('amount').val(),
            purchased: childSnapshot.child('purchased').val()
          }
          // if (childSnapshot.child('purchased').val() )
          console.log(childSnapshot.child('purchased').val())
          console.log(typeof childSnapshot.child('purchased').val())
          if (childSnapshot.child('purchased').val() == false) {
            nonPurchasedList.push(currItem)
          }
          arrayItemList.push(currItem)
        }
      })
    }).catch(function(error) {
      console.log('An error occured while saving pulling listing data from firebase');
      console.log(error.code);
      console.log(error.message);
      reject(error);
    });
    // First pass will usually be undefined so we have to account for it.
    if(typeof arrayItemList !== 'undefined') {
      that.setState({ items: arrayItemList})
      that.setState({ nonPurchasedItems: nonPurchasedList})
    }
    resolve(arrayItemList)
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
        imageName: imageFile['name'],
        purchased: false
      }).catch(function(error) {
        console.log('An error occured while saving the posting to listings in firebase');
        console.log(error.code);
        console.log(error.message);
        reject(error);
      });

      // Adds new listing to myListing field
      var currUserID = firebase.auth().currentUser.uid
      firebase.database().ref('/Users/' + currUserID).once('value').then((snapshot) => {
        if (snapshot.child('myListings').val() == '') {
          var myListingsList = id
        } else {

          // Taking the database field as a string and then splitting it to get an array to more easily parse through.
          // We do this because firebase doesnt support arrays in their database.
          var myListingsList = snapshot.child('myListings').val().split(',')
          myListingsList.push(id)
          myListingsList = myListingsList.toString();
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
        myCartItems: childSnapshot.child('myCartItems').val()
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
        	wif: wif,
          myCartItems: '',
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
  return new Promise((resolve,reject) => {
    // Removing post from listing database 
    firebase.database().ref('/Listings/' + id).remove().then(function() {

      // Removing reference image 
      firebase.database().ref('/ListingImages/' + id).remove()

      // Removing listing ID from myListings user field
      var currUserID = firebase.auth().currentUser.uid
      firebase.database().ref('/Users/' + currUserID).once('value').then((snapshot) => {

        // Make into array to more easily parse through
        var myListingsList = snapshot.child('myListings').val().split(','); 
        if(myListingsList.length == 1) {
          // If delelting last myListing, then set database value back to blank value('')
          myListingsList = ''
        } else {
          var index = myListingsList.indexOf(id)
          if(index != -1){
            myListingsList.splice(index, 1)
            myListingsList = myListingsList.toString()
          }
        }
        firebase.database().ref('/Users/' + currUserID).update({
          'myListings': myListingsList
        }).catch(function(error) {
          console.log('An error occured while updating the myListings field');
          console.log(error.code);
          console.log(error.message);
          reject(error);
        })
        resolve(snapshot.child('myListings').val())
      }).catch(function(error) {
        console.log('An error occured while adding remvoing the myListings');
        console.log(error.code);
        console.log(error.message);
        reject(error);
      })

    }).catch(function(error) {
      // Handle Errors here.
      console.log('An error has occured while removing a listing: ')
      console.log(error.code)
      console.log(error.message)
    })
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

export function addCartItemToDatabaseField(id, that) {
  return new Promise((resolve,reject) => { 
    var currUserID = firebase.auth().currentUser.uid
    firebase.database().ref('/Users/' + currUserID).once('value').then((snapshot) => {
      if (snapshot.child('myCartItems').val() == '') {
        var cartItemList = id
      } else {
        var cartItemList = snapshot.child('myCartItems').val().split(',')
        cartItemList.push(id)
        cartItemList = cartItemList.toString();
      }
      firebase.database().ref('/Users/' + currUserID).update({
        'myCartItems': cartItemList
      }).catch(function(error) {
        console.log('An error occured while updating the cartItems field');
        console.log(error.code);
        console.log(error.message);
        reject(error);
      })
      resolve(snapshot.child('myCartItems').val())
    }).catch(function(error) {
      console.log('An error occured while adding cartitems to firebase');
      console.log(error.code);
      console.log(error.message);
      reject(error);
    })
  })
}

export function removeCartItemFromDatabase(id, that) {
  return new Promise((resolve,reject) => { 
    var currUserID = firebase.auth().currentUser.uid
    firebase.database().ref('/Users/' + currUserID).once('value').then((snapshot) => {
      var cartItemList = snapshot.child('myCartItems').val().split(','); 
      if(cartItemList.length == 1) {
        cartItemList = ''
      } else {
        var index = cartItemList.indexOf(id)
        if(index != -1){
          cartItemList.splice(index, 1)
          cartItemList = cartItemList.toString()
        }
      }
      firebase.database().ref('/Users/' + currUserID).update({
        'myCartItems': cartItemList
      }).catch(function(error) {
        console.log('An error occured while updating the cartItems field');
        console.log(error.code);
        console.log(error.message);
        reject(error);
      })
      resolve(snapshot.child('myCartItems').val())
    }).catch(function(error) {
      console.log('An error occured while adding remvoing the cartItem');
      console.log(error.code);
      console.log(error.message);
      reject(error);
    })
  })
}

export function getCartItemsFromDatabase(that) {
  return new Promise((resolve,reject) => { 
    var currUserID = firebase.auth().currentUser.uid
    firebase.database().ref('/Users/' + currUserID).once('value').then((snapshot) => {
      if (snapshot.child('myCartItems').val() == '') {
        that.setState({cartItems: []})
      } else {
        that.setState({cartItems: (snapshot.child('myCartItems').val()).split(',')})
      }
      resolve(snapshot.child('myCartItems').val());
    }).catch(function(error) {
      console.log('An error occured while pulling cartItems from firebase');
      console.log(error.code);
      console.log(error.message);
      reject(error);
    })
  })
}

export function getMyPurchasesFromDatabase(that) {
  return new Promise((resolve,reject) => { 
    var currUserID = firebase.auth().currentUser.uid
    firebase.database().ref('/Users/' + currUserID).once('value').then((snapshot) => {
      if (snapshot.child('myPurchases').val() == '') {
        that.setState({myPurchases: []})
      } else {
        that.setState({myPurchases: (snapshot.child('myPurchases').val()).split(',')})
      }
      resolve(snapshot.child('myPurchases').val());
    }).catch(function(error) {
      console.log('An error occured while pulling myPurchases from firebase');
      console.log(error.code);
      console.log(error.message);
      reject(error);
    })
  })
}

export function makePurchase(cartItems, that) {
  console.log('calling makePurchase')
  console.log(cartItems)
  console.log(that)
  return new Promise((resolve,reject) => { 
    var currUserID = firebase.auth().currentUser.uid
    firebase.database().ref('/Users/' + currUserID).once('value').then((snapshot) => {
      // console.log('Inside user myPurchases')
      // console.log(snapshot.child('myPurchases').val())
      if (snapshot.child('myPurchases').val() == '') {
        var currPurchList = cartItems
        console.log(currPurchList)
      } else {
        var currPurchList = snapshot.child('myPurchases').val().split(',');  
        console.log(currPurchList)
        console.log('adding list together')
        currPurchList = currPurchList.concat(cartItems)
        console.log(currPurchList)
      }
      currPurchList = currPurchList.toString()

      // Updating User's myPurchases field to hold what the user just purchased.
      firebase.database().ref('/Users/' + currUserID).update({
        'myPurchases': currPurchList
      }).catch(function(error) {
        console.log('An error occured while updating the cartItems field');
        console.log(error.code);
        console.log(error.message);
        reject(error);
      })

      // Setting User's cartItems to '' since they just purhcased their items
      firebase.database().ref('/Users/' + currUserID).update({
        'myCartItems': ''
      }).catch(function(error) {
        console.log('An error occured while updating the cartItems field');
        console.log(error.code);
        console.log(error.message);
        reject(error);
      })

      // Goes into Listing and changes purchased flag to true
      for (var i=0;i < cartItems.length;i++) {
        console.log(cartItems[i])
        firebase.database().ref('/Listings/' + cartItems[i]).update({
          purchased: true
        }).catch(function(error) {
          console.log('An error occured while changing the Listing purchase field');
          console.log(error.code);
          console.log(error.message);
          reject(error);
        })
      }

      resolve(snapshot.child('myPurchases').val());
    }).catch(function(error) {
      console.log('An error occured while pulling myPurchases from firebase');
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
