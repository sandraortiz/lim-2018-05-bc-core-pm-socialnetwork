const buttonLogout = document.querySelector(".buttonLogout");
buttonLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        window.location = "home.html"
    })
        .catch(function (error) { });
})

window.onload = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) { //Si está logeado, mostraremos la opción loggedIn
            console.log('esta logueado')
            userName.innerHTML = `${user.displayName}`;
            userImage.innerHTML = ` <img src="${user.photoURL}" alt="user" class="profile-photo" />`;
            writeUserData(user.uid, user.displayName, user.email, user.photoURL);
            if (userName.innerHTML == 'null') {
                userName.innerHTML = `${user.email}`
                // userImage.innerHTML = ` <img src="${user.photoURL}" alt="user" class="profile-photo" />`;
            }
        }
        else {
            console.log('no esta logueado');
        }
        console.log("User > " + JSON.stringify(user));
    });
};
function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}
const bd = document.getElementById('bd');
const btnSave = document.getElementById('btnSave');
const post = document.getElementById('post');
const posts = document.getElementById('posts');
function writeNewPost(uid, body) {
    var postData = {
        uid: uid,
        body: body,
    };
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    firebase.database().ref().update(updates);
    return newPostKey;
};
btnSave.addEventListener('click', () => {
    const userId = firebase.auth().currentUser.uid;
    const newPost = writeNewPost(userId, post.value);
    var btnUpdate = document.createElement('input');
    btnUpdate.setAttribute('value', 'Editar');
    btnUpdate.setAttribute('type', 'button');
    var btnDelete = document.createElement('input');
    btnDelete.setAttribute('value', 'delete');
    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('id', newPost);
    var contPost = document.createElement('div');
    var textPost = document.createElement('textarea');
    textPost.setAttribute('id', newPost);
    textPost.innerHTML = post.value;
    btnDelete.addEventListener('click', (evt) => {
        if (newPost == evt.target.id) {
            firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
            firebase.database().ref().child('/posts/' + newPost).remove();
            textPost.remove();
            btnUpdate.remove();
            btnDelete.remove();
        }
    })
    btnUpdate.addEventListener('click', () => {
        // textPost.setAttribute('contenteditable' , true);
        btnUpdate.remove();
        var btnpublicar = document.createElement('input');
        btnpublicar.setAttribute('value', 'publicar');
        btnpublicar.setAttribute('type', 'button');
        btnpublicar.addEventListener('click', () => {
            const newUpdate = document.getElementById(newPost);
            const nuevoPost = {
                body: newUpdate.value,
            };
            var updateUser = {};
            var updatePost = {};
            updateUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
            updatePost['/posts/' + newPost] = nuevoPost;
            firebase.database().ref().update(updateUser);
            firebase.database().ref().update(updatePost);
            // textPost.setAttribute('contenteditable' , false);
        })

        contPost.appendChild(btnpublicar);
    });

    contPost.appendChild(textPost);
    contPost.appendChild(btnUpdate);
    contPost.appendChild(btnDelete);
    posts.appendChild(contPost);
})

const dbRefObject = firebase.database().ref()