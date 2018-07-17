const userEmail = document.querySelector(".userEmail");
const userPassword = document.querySelector(".userPassword");
const buttonLogin = document.querySelector(".buttonLogin");
const buttonfacebook = document.querySelector(".buttonFacebook");
const buttongoogle = document.querySelector(".buttonGoogle");
const buttonRegister = document.querySelector(".buttonRegister");
const buttonLogout = document.querySelector(".btnLogout");
const logout = document.querySelector('.logout');
const state = {
    name:null,
};
window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            login.classList.remove("hiden");
            logout.classList.add("hiden");
            console.log("inicio sesion")
        } else {
            console.log("no esta logueado");
            login.classList.add("hiden");
            logout.classList.remove("hiden");
        }
    });
}
buttonRegister.addEventListener('click', () => {
    const userEmailvalue = userEmail.value;
    const userPasswordvalue = userPassword.value;
    firebase.auth().createUserWithEmailAndPassword(userEmailvalue, userPasswordvalue)
        .then(() => {
            state.name = 
            console.log("usuario creado");

        })
        .catch((error) => {
            console.log("error de firebase > Codigo > " + error.code);
            console.log("error de firebase > Mensaje >" + error.message)
        });
})
buttonLogin.addEventListener('click', () => {
    const emailValue = userEmail.value;
    const passwordValue = userPassword.value;
    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
        .then(() => {
            console.log("usuario inicio sesion");
        })
        .catch((error) => {
            console.log("error de firebase > Codigo > " + error.code);
            console.log("error de firebase > Mensaje >" + error.message)
        });
})


buttongoogle.addEventListener('click ' , () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log("inicio sesion")
      }).catch(function(error) {
console.log(error.code);
console.log(error.message);
console.log( error.email);
 console.log( error.credential);
     
  })
})

buttonLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        console.log('cerro sesion');
        login.classList.remove("hiden");
        logout.classList.add("hiden");
    }).catch(function (error) {
        console.log('error al cerrar sesion');
    });

})
