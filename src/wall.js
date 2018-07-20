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

            userName.innerHTML =` Bienvenida  ${user.displayName}`;
            writeUserData(user.uid , user.displayName, user.email, user.photoURL);
            bd.classList.remove("hiden");
            

            
            posts.classList.remove("hiden");
        } else { //Si NO está logeado, mostraremos la opción loggedOut
            console.log('no esta logueado');
            posts.classList.add('hiden');
            bd.classList.add('hiden');
            
        }
        console.log("User > " + JSON.stringify(user));
    });
};

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

const bd = document.getElementById('bd');
const btnSave = document.getElementById('btnSave');
const post = document.getElementById('post');
const posts = document.getElementById('posts');

function writeNewPost(uid,body){
    var postData = {
        uid:uid,
        body:body,
    };

var newPostKey = firebase.database().ref().child('posts').push().key;
var updates = {};
updates['/posts/' + newPostKey] = postData;
updates['/posts/' + uid + '/' + newPostKey ] = postData; 
firebase.database().ref().update(updates);
return newPostKey;
};
btnSave.addEventListener('click' , () => {
    var userId = firebase.auth().currentUser.uid;
    const newPost = writeNewPost(userId , post.value);
    var btnUpdate = document.createElement('input');
    btnUpdate.setAttribute('value' , 'Update');
    btnUpdate.setAttribute('type' , 'button');
    var btnDelete = document.createElement('input');
    btnDelete.setAttribute('value' , 'delete' ) ;
    btnDelete.setAttribute('type' , 'button');
    var contPost = document.createElement('div');
    var textPost = document.createElement('textarea');
    textPost.setAttribute('id' , newPost);
    textPost.innerHTML = post.value;
    // btnDelete.addEventListener('click',()=>{

    // })
})
