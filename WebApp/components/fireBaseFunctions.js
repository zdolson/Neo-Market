import React from 'react'

import * as firebase from 'firebase'

export function pullingDatabaseImage(id, imgUrl, imgLoad, tryAgain, that) {
	if(tryAgain && !imgLoad){
		firebase.database().ref('/ListingImages/').once('value').then((snapshot) => {
			var keys = Object.keys(snapshot.val())
		  for(var i=0; i<keys.length;i++){
		    if(id == keys[i]){
		      var ref = firebase.storage().ref(snapshot.child(id).val());
		      ref.getDownloadURL().then(url => {
		      	  that.setState({ imgUrl: url, imgLoad: true });
		      }).catch(err => {
		        	console.error(err)
	      	});
		  	}
		  }
		}).catch(err => {
			console.error(err)
			that.setState({tryAgain: false})
		});
	}
}

function checkItemListForRepetitive(id, listOfItems, arrayItemList){
  console.log(id)
  console.log(listOfItems)
  console.log(arrayItemList)
  for(var i = 0; i<listOfItems.length;i++){
    console.log(listOfItems[i])
  }
}

export function pullDataFromDatabase(that) {
  var arrayItemList = []
  var currItem = {}
  console.log(that.state.items)
  var fireBaseDatabaseRef = firebase.database().ref('/Listings/');
  fireBaseDatabaseRef.on('value', function(snapshot) {
    snapshot.forEach((childSnapshot) => {
      currItem = {
        id: childSnapshot.child('id').val(),
        owner: childSnapshot.child('owner').val(),
        title: childSnapshot.child('title').val(),
        description: childSnapshot.child('description').val(),
        price: childSnapshot.child('price').val(),
        amount: childSnapshot.child('amount').val(),
      }

      checkItemListForRepetitive(childSnapshot.child('id').val(), that.state.items, arrayItemList)

      for(var i = 0; i < arrayItemList.length;i++){
        console.log(childSnapshot.child('id').val())
        console.log(arrayItemList[i]['id'])
        if(childSnapshot.child('id').val() == arrayItemList[i]['id']){
          console.log('>>>>>>>>>>> Theyre the same!')
          console.log(childSnapshot.child('id').val())
          console.log(arrayItemList[i]['id'])
        }
      }

      // loop through snapshot.val()
      // check currItem id to the snapshot values
        // If they are the same then pass over it, else if it isnt in the list push it to arrayItemList
      arrayItemList.push(currItem)
    })
    console.log(arrayItemList)
    // First pass will usually be undefined so we have to account for it.
    if(typeof arrayItemList !== 'undefined') {
      that.setState({ items: arrayItemList})
    }
  })
}

// export function pullDataFromDatabase(that){
//   var arrayItemList = []
//   var currItem = {}
  
//   firebase.database().ref('/Listings/').once('value').then((snapshot) => {
//     snapshot.forEach((childSnapshot) => {
//       currItem = {
//         id: childSnapshot.child('id').val(),
//         owner: childSnapshot.child('owner').val(),
//         title: childSnapshot.child('title').val(),
//         description: childSnapshot.child('description').val(),
//         price: childSnapshot.child('price').val(),
//         amount: childSnapshot.child('amount').val(),
//       }
//       arrayItemList.push(currItem)
//     })

//     // First pass will usually be undefined so we have to account for it.
//     if(typeof arrayItemList !== 'undefined') {
//       that.setState({ items: arrayItemList})
//     }

//   }).catch(err => {
//     console.error(err)
//   });
// }

export function postNewPostingToDatabase(id, owner, title, description, price, amount, imageFile) {
  console.log(id)
  console.log(owner)
  console.log(title)
  console.log(description)
  console.log(price)
  console.log(amount)
  console.log(imageFile['name'])

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

  // Adds new posting ID to databse storage -> 'ListingImages'
  firebase.database().ref('/ListingImages/' + id).set(imageFile['name']);

  // Adds new photo to firebase storage
  var ref = firebase.storage().ref().child(imageFile['name']);
  ref.put(imageFile).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
  });
}

export function pullUsersFromDatabase(that){
  var arrayUserList = []
  var currUser = {}

  firebase.database().ref('/Users/').once('value').then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      currUser = {
        wif: childSnapshot.child('WIF').val(),
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