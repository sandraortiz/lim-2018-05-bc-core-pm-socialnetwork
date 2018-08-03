// Mostrar el registro
const registerform = document.querySelector(".register");
const buttonRegisterForm = document.querySelector('.buttonRegisterForm');
const loginform = document.querySelector('.login');
buttonRegisterForm.addEventListener('click', () => {
    registerform.style.display = 'block';
    loginform.style.display = 'none';
})

// register
const userName = document.querySelector('.userName');
const userLastName = document.querySelector('.userLastName');
const userEmail = document.querySelector(".userEmail");
const userPassword = document.querySelector(".userPassword");
const userPasswordVerification = document.querySelector(".userPasswordVerification");
const buttonRegister = document.querySelector(".buttonRegister");
const errorMessagePassword = document.getElementById("mensaje-error");
const errorMessagePassword1 = document.getElementById("mensajeErrorPassword");
// login 
const userEmailLogin = document.querySelector(".userEmailLogin");
const userPasswordLogin = document.querySelector(".userPasswordLogin");
const buttonfacebookLogin = document.querySelector(".buttonFacebookLogin");
const buttongoogleLogin = document.querySelector(".buttonGoogleLogin");
const buttonLogin = document.querySelector('.buttonLogin');
const  buttonReturn = document.getElementById('return')

buttonReturn.addEventListener('click' , () => {
    registerform.style.display = 'none';
    loginform.style.display = 'block';
})



buttonLogin.addEventListener('click', () => {
    const emailValue = userEmailLogin.value;
    const passwordValue = userPasswordLogin.value;
    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
        .then(() => {
            console.log('inicio sesion');
            window.location = 'wall.html'
        })
        .catch((error) => {
            console.log("error de firebase > Codigo > " + error.code);
            console.log("error de firebase > Mensaje >" + error.message)
        });
})

buttonfacebookLogin.addEventListener('click', () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
    });
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            console.log('sesion facebook')
            window.location = 'wall.html'


        }).catch(function (error) {
            console.log(error.code);
            console.log(error.message);
            console.log(error.email);
            console.log(error.credential);
        });
})

buttongoogleLogin.addEventListener('click', () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log("inicio sesion");
        window.location = 'wall.html'
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
    if (userPasswordvalue.length >= 6) {
        if (userPasswordvalue == userPasswordVerificationvalue) {
            firebase.auth().createUserWithEmailAndPassword(userEmailvalue, userPasswordvalue)
                .then(() => {
                    console.log("usuario creado");
                     window.location='wall.html'
                })
                .catch((error) => {
                    console.log("error de firebase > Codigo > " + error.code);
                    console.log("error de firebase > Mensaje >" + error.message)
                });
        }
        else {
            errorMessagePassword.innerText = "Las contraseñas no coinciden";
        }
    }
    else {
        errorMessagePassword1.innerText = '*Su contraseña debe tener más de 6 caracteres';
    }
})

