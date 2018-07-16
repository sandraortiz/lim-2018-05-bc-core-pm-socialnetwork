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
  
// tendria que hacer una condicion.. de que si se ingresa un correo y contraseña correcta..pueda ingresar ??
// solo tiene una condicion en el registro de que las contraseñas sean iguales 
// creo q tmb que este todo llenado.. xq le hice click asi nomas... igual me mando al muro
// sera q yo lo vi en mi html desactualizado..ok... hare la condicion
//es condicion ya la tiene e

// a mi no me manda al muro 
// si debe ser xq lo probe y no funciona si no esta llenado 
// no entiendo entonces... solo si esos dos valores son iguales ...firebase autentica....
//entonces...q condicion debo hacer
//yo le pregunte a gonzalo eso.. le dije.. y si yo en vez de colocar un correo valido pongo una direccion inexistente..
//dijo q no habia problema.. si queria verificar enviando un correo se podia.. pero era otro trabajo q no requerian
  // debia ser que el email este bien escrito con el @hotmail.com pero no se como 