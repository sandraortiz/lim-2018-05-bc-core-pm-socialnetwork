const userEmail = document.querySelector(".userEmail");
const userPassword = document.querySelector(".userPassword");
const buttonLogin = document.querySelector(".buttonLogin");
const buttonRegisterPage = document.querySelector(".registerPage");
const buttonfacebook = document.querySelector(".buttonFacebook");
const buttonGoogle = document.querySelector(".buttonGoogle");
 buttonRegisterPage.addEventListener('click',()=>{
    location.href="../src/register.html"
})


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

  //LOGIN
buttonLogin.addEventListener('click', () => {
    const emailValue = userEmail.value;
    const passwordValue = userPassword.value;
    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
        .then(() => {
           window.location='inicio.html';
        })
        .catch((error) => {
            console.log("error de firebase > Codigo > " + error.code);
            console.log("error de firebase > Mensaje >" + error.message)
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
      window.location='inicio.html';
      
    }).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
    });
   } )
  
  
  
  
  
  
  
  
  
  
  
  
  
  