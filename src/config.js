// Initialize Firebase
var config = {
    apiKey: "AIzaSyD33a72Urx8vLxoSDdJu0woInLXFQ3yq3M",
    authDomain: "socialnetwork-165d4.firebaseapp.com",
    databaseURL: "https://socialnetwork-165d4.firebaseio.com",
    projectId: "socialnetwork-165d4",
    storageBucket: "socialnetwork-165d4.appspot.com",
    messagingSenderId: "544234037594"
  };
  firebase.initializeApp(config);

  
window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          loggedIn.style.display = "block";
          loggedOut.style.display = "none";
      } else {
          loggedIn.style.display = "none";
          loggedOut.style.display = "block";
      }
      console.log("User >" + JSON.stringify(user));
  });
}
function registerWithFirebase() {
  const emailValue = email.value;
  const passwordValue = password.value;
  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
      .then(() => {
          console.log("usuario creado");
      })
      .catch((error) => {
          console.log("error de firebase > Codigo > " + error.code);
          console.log("error de firebase > Mensaje >" + error.message)
      });
}
function loginWithFirebase() {
  const emailValue = email.value;
  const passwordValue = password.value;
  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
      .then(() => {
          console.log("usuario inicio sesion");
      })
      .catch((error) => {
          console.log("error de firebase > Codigo > " + error.code);
          console.log("error de firebase > Mensaje >" + error.message)
      });
}
function logoutWithFirebase() {
  firebase.auth().signOut()
      .then(() => {
          console.log("usuario finalizo su sesion")
      })
      .cath((error) => {
          console.log("error de firebase > Codigo > " + error.code);
          console.log("error de firebase > Mensaje >" + error.message)
      });
}
















