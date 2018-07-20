const buttonLogout = document.querySelector(".buttonLogout");



buttonLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        window.location = "home.html"
    })
        .catch(function (error) {

        });
})
window.onload = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) { //Si está logeado, mostraremos la opción loggedIn
            console.log('esta logueado')
            userName.innerText = user.displayName;
        } else { //Si NO está logeado, mostraremos la opción loggedOut
            console.log('no esta logueado');
        }
        console.log("User > " + JSON.stringify(user));
    });
};

