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

            userName.innerHTML = `${user.displayName}`;
            userImage.innerHTML = ` <img src="${user.photoURL}" alt="user" class="profile-photo"/>`;
            writeUserData(user.uid, user.displayName, user.email, user.photoURL);
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
// firebase.database().ref('messages')
// .limitToLast(1)
// .on('child_added', (newMessage)=>{
//     messageContainer.innerHTML += `

//         <p>${newMessage.val().text}</p>
//     `;

//     // <p>Nombre : ${newMessage.val().creatorName}</p>
// });
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
        body: body
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
    const postMuro = post.value;
    const space = postMuro.trim()
    console.log(space)
    // debugger
    if (postMuro.length !== 0 && space !== '') {
        const newPost = writeNewPost(userId, post.value);
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
        var textPost = document.createElement('p');
        textPost.setAttribute('id', newPost);
        textPost.innerHTML = post.value;

        btnUpdate.addEventListener('click', () => {
            textPost.setAttribute('contenteditable', true);
            const newUpdate = document.getElementById(newPost);
            const nuevoPost = {
                body: newUpdate.value,
            };
            var updateUser = {};
            var updatePost = {};
            updateUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
            updatePost['/posts/' + newPost] = nuevoPost;
            btnUpdate.value = 'publicar'
            firebase.database().ref().update(updateUser);
            firebase.database().ref().update(updatePost);
        });
        btnLike.addEventListener('click', () => {
            let contador = 0;
            contador += contador + 1;
            // let btnLikeCount = document.getElementById("likes");
            btnLike.value = "like (" + contador + ")";

        })
        posts.appendChild(contPost);
        contPost.appendChild(textPost);
        contPost.appendChild(btnUpdate);
        contPost.appendChild(btnDelete);
        contPost.appendChild(btnLike);

        btnDelete.addEventListener('click', (evt) => {
            if ( newPost === evt.target.id) {
            const question = confirm('Esta seguro que desea eliminar esta publicacion?')
            if (question === true) {
                firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
                firebase.database().ref().child('/posts/' + newPost).remove();
                textPost.remove();
                btnUpdate.remove();
                btnDelete.remove();
                btnLike.remove();
                
                // while (posts.firstChild) posts.removeChild(posts.firstChild);
                //    alert('hola');
            }
        }  
        })
    }
})
// const searchUser= getElementById("search-user")

// searchUser.addEventListener('keyup', () => {
//     let usersFilter = userName;
//     search = search.toLowerCase();
//     usersFilter = usersFilter.filter(user => user.name.toLowerCase().indexOf(search) >= 0)
//     return usersFilter;

// }
// )


function reload_page() {
    window.location.reload();
}

// function sendMessage(){
//     const currentUser = firebase.auth().currentUser;
//     const messageAreaText = messageArea.value;

//     //Para tener una nueva llave en la colección messages
//     const newMessageKey = firebase.database().ref().child('messages').push().key;

//     firebase.database().ref(`messages/${newMessageKey}`).set({
//         creator : currentUser.uid,
//         creatorName : currentUser.displayName,
//         text : messageAreaText
//     });
// }