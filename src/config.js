var config = {
  apiKey: "AIzaSyD33a72Urx8vLxoSDdJu0woInLXFQ3yq3M",
  authDomain: "socialnetwork-165d4.firebaseapp.com",
  databaseURL: "https://socialnetwork-165d4.firebaseio.com",
  projectId: "socialnetwork-165d4",
  storageBucket: "socialnetwork-165d4.appspot.com",
  messagingSenderId: "544234037594"
};
firebase.initializeApp(config);
const buttonloggedOut = document.getElementById('logout');
const loginButton = document.getElementById('loginButton');
const registerbutton = document.getElementById('registerButton');
const emailuser = document.getElementById('email');
const passworduser = document.getElementById('password');
const google = document.getElementById('buttongoogle');
const  buttonfacebook = document.getElementById('buttonfacebook');

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
registerbutton.addEventListener('click', () => {
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
  });

loginButton.addEventListener('click', () => {
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
})
buttonloggedOut.addEventListener('click' ,() => {
    firebase.auth().signOut()
      .then(() => {
        console.log("usuario finalizo su sesion")
      })
      .cath((error) => {
        console.log("error de firebase > Codigo > " + error.code);
        console.log("error de firebase > Mensaje >" + error.message)
      });
})

google.addEventListener('click ' , () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  firebase.auth().signInWithPopup(provider)
  .then(function(result)
   {
   console.log('sesion google')
  })
  .catch(function(error) {
    console.log(error.code);
    console.log(error.message);
  console.log(error.email);
  console.log(error.credential);
   });
})
 buttonfacebook.addEventListener('click' ,() => {
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
  .then(function(result) {
    console.log('sesion facebook')
    
  }).catch(function(error) {
    console.log(error.code);
    console.log(error.message);
  console.log(error.email);
  console.log(error.credential);
  });
 } )











