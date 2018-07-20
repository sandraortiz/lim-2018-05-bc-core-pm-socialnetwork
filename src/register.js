const userEmail = document.querySelector(".userEmail");
const userPassword= document.querySelector(".userPassword");
const userPasswordVerification = document.querySelector(".userPasswordVerification");
const buttonRegister = document.querySelector(".buttonRegister");
const buttonfacebook = document.querySelector(".buttonFacebook")
buttonRegister.addEventListener('click',()=>{
    const userEmailvalue = userEmail.value;
    const userPasswordvalue =userPassword.value ;
    const userPasswordVerificationvalue = userPasswordVerification.value;
    if(userPasswordvalue==userPasswordVerificationvalue){
        firebase.auth().createUserWithEmailAndPassword(userEmailvalue, userPasswordvalue)
        .then(() => {
          console.log("usuario creado");
          window.location='inicio.html';
        })
        .catch((error) => {
          console.log("error de firebase > Codigo > " + error.code);
          console.log("error de firebase > Mensaje >" + error.message)
        });
    }
} )

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
  
   const buttonGoogle=document.querySelector(".buttongoogle");
   buttonGoogle.addEventListener('click' , () => {
       var provider = new firebase.auth.GoogleAuthProvider();
       firebase.auth().signInWithPopup(provider).then(function (result) {
           console.log("inicio sesion");
       })
       .catch(function (error) {
           console.log(error.code);
           console.log(error.message);
           console.log(error.email);
           console.log(error.credential);
   
       })
   })
   