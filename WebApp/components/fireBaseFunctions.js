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


export function pullDataFromDatabase(that){
  var arrayItemList = []
  var currItem = {}
  
  firebase.database().ref('/Listings/').once('value').then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      currItem = {
        id: childSnapshot.child('id').val(),
        owner: childSnapshot.child('owner').val(),
        title: childSnapshot.child('title').val(),
        description: childSnapshot.child('description').val(),
        price: childSnapshot.child('price').val(),
        amount: childSnapshot.child('amount').val(),
      }
      arrayItemList.push(currItem)
    })

    // First pass will usually be undefined so we have to account for it.
    if(typeof arrayItemList !== 'undefined') {
      that.setState({ items: arrayItemList})
    }

  }).catch(err => {
    console.error(err)
  });
}