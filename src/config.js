(function(){
  const config = {
    apiKey: "AIzaSyD33a72Urx8vLxoSDdJu0woInLXFQ3yq3M",
    authDomain: "socialnetwork-165d4.firebaseapp.com",
    databaseURL: "https://socialnetwork-165d4.firebaseio.com",
    projectId: "socialnetwork-165d4",
    storageBucket: "socialnetwork-165d4.appspot.com",
    messagingSenderId: "544234037594"
  };
 firebase.initializeApp(config);
const emailU  = document.getElementById('email');
const passwordU = document.getElementById('password');
const buttonl = document.getElementById('entrar');
const button2 = document.getElementById('registrar');
const button3 = document.getElementById('salir');
buttonl.addEventListener('click' ,  e =>{
  const email = emailU.value;
const password = passwordU.value;
const auth = firebase.auth();
const promise = auth.singInWithEmailAndPassword(email,password);
promise.catch(e => console.log(e.message));
});
button2.addEventListener('click' , e => {
  const email = emailU.value;
  const password = passwordU.value;
  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(email,password);
  promise.catch(e => console.log(e.message));
});


}());


firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});