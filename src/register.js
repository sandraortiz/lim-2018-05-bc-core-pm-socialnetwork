const userName = document.querySelector("name");
const userLastname = document.querySelector("apellido");
const userEmail = document.querySelector(".userEmail");
const userPassword = document.querySelector(".userPassword");
const userPasswordVerification = document.querySelector(".userPasswordVerification");
const buttonRegister = document.querySelector(".buttonRegister");
const buttonfacebook = document.querySelector(".buttonFacebook");
const buttonGoogle = document.querySelector(".buttonGoogle");
const errormessage = document.getElementById("mensaje-error");
const errorName = document.getElementById("name-error");
const errorLastname = document.getElementById("lastname-error");


buttonGoogle.addEventListener('click' , () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log("inicio sesion");
        window.location="inicioecofrie.html";
    })
    .catch(function (error) {
        console.log(error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);

    })
})
buttonRegister.addEventListener('click', () => {

  const userEmailvalue = userEmail.value;
  const userPasswordvalue = userPassword.value;
  const userPasswordVerificationvalue = userPasswordVerification.value;
  // // console.log(userNameValue)
  // const userLastnameValue = userLastname.value; 
  if (userPasswordvalue.length >= 6) {
    if (userPasswordvalue == userPasswordVerificationvalue) {
      firebase.auth().createUserWithEmailAndPassword(userEmailvalue, userPasswordvalue)
        .then(() => {
          console.log("usuario creado");
          window.location = 'inicio.html';
        })
        .catch((error) => {
          console.log("error de firebase > Codigo > " + error.code);
          console.log("error de firebase > Mensaje >" + error.message)
        });
    }
  }
  else {
    errormessage.innerHTML = '*Su contraseña debe tener más de 6 caracteres'
  }
})



buttonfacebook.addEventListener('click', () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(function (result) {
      console.log('sesion facebook')
      window.location = 'inicio.html';

    }).catch(function (error) {
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(error.credential);
    });
})


