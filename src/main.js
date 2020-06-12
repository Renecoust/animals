import Vue from 'vue'
import App from './App.vue'

 let qapp = '';


import firebase, { app } from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import "firebase/firestore"
import "firebase/storage"


firebase.initializeApp({
    apiKey: "AIzaSyDLAvAWw4prHDeL--Ff7vSregX7pzrEMPw",
    authDomain: "animal-app-720de.firebaseapp.com",
    databaseURL: "https://animal-app-720de.firebaseio.com",
    projectId: "animal-app-720de",
    storageBucket: "animal-app-720de.appspot.com",
    messagingSenderId: "915754209970",
    appId: "1:915754209970:web:0f41f22a497bdc64122fab"
});
var db = firebase.firestore();



// var animalId,animalData;
// db.collection("animals").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     animalId.push(doc.id);
//     animalData.push(doc.data);
//   });
// })

Vue.component('anim', {
  data: function () {
    let animalId = [],
        animalData = [];
    db.collection("animals").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //var qwe = { "id" : doc.id };
        //var qwe2 = { "data" : doc.data };
        let docRef = db.collection("animals").doc(doc.id);
        docRef.get().then(function(docs) {
          if (doc.exists) {
            let key,valueA;
            let anim = docs.data(); 
              animalId.push({animal : anim})
              console.log("qwe : " + animalId);
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      });
    })
    return {animalId};
  },
  template: '<div>' +
    '<div class="animal" v-for="animal in animalId">'
    +'<div class="images images-animal"><img v-bind:src="animal.animal.photo"></div>'
    +'<div class="animal-contents"><p>contacts : {{ animal.animal.contacts }}</p>'
    +'<p>description : {{ animal.animal.description }}</p>'
    +'<p>type : {{ animal.animal.type }}</p></div>'
    +'</div>' 
    +' </div>'
});
new Vue({
  el: '#app',
  data: {
  }
})

// new Vue({
//   el: '#app',
//   data: {
//     //title: qapp
//   },
//   // methods: {
//   //   qwe () {
//   //     // db.collection("animals").get().then((querySnapshot) => {
//   //     //   querySnapshot.forEach((doc) => {
//   //     //     qapp += '<p>'
//   //     //     qapp += `${doc.id} => ${doc.data()}`;
//   //     //     qapp += '</p><br>';
//   //     //     this.title = qapp;
//   //     //   });
//   //     // })
//   //   }
//   // }
//  // render: h => h(App)
// })

// db.collection("animals") .add({
//     contacts: "gagasgassga",
//     description: "gdf",
//     photo: "https://firebasestorage.googleapis.com/v0/b/animal-app-720de.appspot.com/o/images%2Fbe3ce7cc-1026-4321-9826-da8f8b3496eb.jpg?alt=media&token=d9f1abf8-b84b-4353-9ac5-90b442687a79",
//     type: "Собака"
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });