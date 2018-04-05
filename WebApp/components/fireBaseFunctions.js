import React from 'react'

import * as firebase from 'firebase'

export function pullingDatabaseImage(id, imgUrl, imgLoad, tryAgain) {
	if(tryAgain && !imgLoad){
		firebase.database().ref('/ListingImages/').once('value').then(function(snapshot) {
			var keys = Object.keys(snapshot.val())
		  for(var i=0; i<keys.length;i++){
		    if(id == keys[i]){
		      var ref = firebase.storage().ref(snapshot.child(id).val());
		      ref.getDownloadURL().then(url => {
		      	  this.setState({ imgUrl: url, imgLoad: true });
		      }).catch(err => {
		        	console.error(err)
	      	});
		  	}
		  }
		}).catch(err => {
			console.error(err)
			this.setState({tryAgain: false})
		});
	}
}