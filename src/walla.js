const buttonLogout = document.querySelector(".buttonLogout");
const bd = document.getElementById('bd');
const btnSave = document.getElementById('btnSave');
const post = document.getElementById('post');
const posts = document.getElementById('posts');
const users = document.getElementById('postsuser');
const userspost = document.getElementById('myuserpost');
const mypost = document.getElementById('')
window.onload = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('esta logueado')
            userName.innerHTML = `${user.displayName}`;
            userImage.innerHTML = ` <img src="${user.photoURL}" alt="user" class="profile-photo" />`;
            writeUserData(user.uid, user.displayName, user.email, user.photoURL);
            if (userName.innerHTML == 'null') {
                userName.innerHTML = `${user.email}`
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

function writeNewPost(uid, username, body) {

 var postData = {
        author: username,
        uid: uid,
        body: body,

    };
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
}
// writeNewPost(user.uid, user.displayName, post.value)

btnSave.addEventListener('click', () => {
     const userId = firebase.auth().currentUser.uid;
    const userName = firebase.auth().currentUser.displayName;
    const postMuro = post.value;
    const space = postMuro.trim()
    console.log(space)
    // debugger
    if (postMuro.length !== 0 && space !== '') {
        const newPost = writeNewPost(userId, userName, post.value);
        var btnUpdate = document.createElement('input');
        btnUpdate.setAttribute('value', 'Editar');
        btnUpdate.setAttribute('type', 'button');
        var btnDelete = document.createElement('input');
        btnDelete.setAttribute('value', 'delete');
        btnDelete.setAttribute('type', 'button');
        btnDelete.setAttribute('id', newPost);
        var btnLike = document.createElement('input');
        btnLike.setAttribute('value', 'Like');
        btnLike.setAttribute('type', 'button');
        btnLike.setAttribute('id', 'likes');
        var contPost = document.createElement('div');
        var textPost = document.createElement('textarea');
        textPost.setAttribute('id', newPost);
        textPost.innerHTML = post.value;
        btnDelete.addEventListener('click', (evt) => {
            if (newPost === evt.target.id) {
                const question = confirm('Esta seguro que desea eliminar esta publicacion?')
                if (question === true) {
                    firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
                    firebase.database().ref().child('/posts/' + newPost).remove();
                    textPost.remove();
                    btnUpdate.remove();
                    btnDelete.remove();
                    btnLike.remove();
                }
            }
        })
        btnUpdate.addEventListener('click', () => {
            btnUpdate.remove();
            var btnpublicar = document.createElement('input');
            btnpublicar.setAttribute('value', 'publicar');
            btnpublicar.setAttribute('type', 'button');
            btnpublicar.addEventListener('click', () => {
                const newUpdate = document.getElementById(newPost);
                const nuevoPost = {
                    body: newUpdate.value,
                };
                var updatesUser = {};
                var updatePost = {};        
                updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;   
                updatesPost['/posts/' + newPost] = nuevoPost;
                firebase.database().ref().update(updateUser);
                firebase.database().ref().update(updatePost);
            })

            contPost.appendChild(btnpublicar);
        });
        btnLike.addEventListener('click', () => {
            let contador = 0;
            contador += contador + 1;
            btnLike.value = "like (" + contador + ")";

        })

        contPost.appendChild(textPost);
        contPost.appendChild(btnUpdate);
        contPost.appendChild(btnDelete);
        posts.appendChild(contPost);

    }


})



buttonLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        window.location = "home.html"
    })
        .catch(function (error) { });
})





