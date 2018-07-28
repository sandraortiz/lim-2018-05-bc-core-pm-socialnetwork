const buttonLogout = document.querySelector(".buttonLogout");
buttonLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        window.location = "home.html"
    })
        .catch(function (error) { });
})
const users = document.getElementById('postsuser');
const userspost = document.getElementById('myuserpost');
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
            firebase.database().ref('Posts')
               .on('child_added', (newPosts) => {
                posts.innerHTML += ` <p> ${newPosts.val().creatorName}</p>
                <p>${newPosts.val().text}</p>`;
                });
            firebase.database().ref('userPosts')
             .on('child_added', (newPostsUSER) => {
                    myuserpost.innerHTML += `<p>${newPostsUSER.val().text}</p>`;
                });
            }
        else {
            console.log('no esta logueado');
        }
        console.log("User > " + JSON.stringify(user));
    });
};
function escriborpostear (){
    const currentUser = firebase.auth().currentUser;
    const messageAreaText = post.value;
    const newPostsKey = firebase.database().ref().child('Posts').push().key;
    firebase.database().ref(`Posts/${newPostsKey}`).set({
        creator: currentUser.uid,
        creatorName: currentUser.displayName,
        text: messageAreaText
    });
    firebase.database().ref('/userPosts/' + currentUser.uid + '/' + newPostsKey).set({
        text: messageAreaText,
        creator: currentUser.uid
    });

}
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
btnSave.addEventListener('click', () => {
    const postMuro = post.value;
    const space = postMuro.trim()
    if (postMuro.length !== 0 && space !== '') {
        escriborpostear();
        // var btnUpdate = document.createElement('input');
        // btnUpdate.setAttribute('value', 'Editar');
        // btnUpdate.setAttribute('type', 'button');
        // // var btnDelete = document.createElement('input');
        // // btnDelete.setAttribute('value', 'delete');
        // // btnDelete.setAttribute('type', 'button');
        // // btnDelete.setAttribute('id', newPost);
        // var btnLike = document.createElement('input');
        // btnLike.setAttribute('value', 'Like');
        // btnLike.setAttribute('type', 'button');
        // btnLike.setAttribute('id', 'likes');
        // // var contPost = document.createElement('div');
        // // var textPost = document.createElement('textarea');
        // // textPost.setAttribute('id', newPost);
        // // textPost.innerHTML = post.value;
        // // btnDelete.addEventListener('click', (evt) => {
        // //     if (newPost === evt.target.id) {
        // //         const question = confirm('Esta seguro que desea eliminar esta publicacion?')
        // //         if (question === true) {
        // //             firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
        // //             firebase.database().ref().child('/posts/' + newPost).remove();
        // //             textPost.remove();
        // //             btnUpdate.remove();
        // //             btnDelete.remove();
        // //             btnLike.remove();
        // //         }
        // //     }
        // // })
        // btnUpdate.addEventListener('click', () => {
        //     btnUpdate.remove();
        //     var btnpublicar = document.createElement('input');
        //     btnpublicar.setAttribute('value', 'publicar');
        //     btnpublicar.setAttribute('type', 'button');
        //     btnpublicar.addEventListener('click', () => {
        //         const newUpdate = document.getElementById(newPost);
        //         const nuevoPost = {
        //             body: newUpdate.value,
        //         };
        //         var updateUser = {};
        //         var updatePost = {};
        //         updateUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
        //         updatePost['/posts/' + newPost] = nuevoPost;
        //         firebase.database().ref().update(updateUser);
        //         firebase.database().ref().update(updatePost);
        //     })
        //     contPost.appendChild(btnpublicar);
        // });
        // btnLike.addEventListener('click', () => {
        //     let contador = 0;
        //     contador += contador + 1;
        //     btnLike.value = "like (" + contador + ")";

        // })
        // contPost.appendChild(textPost);
        // contPost.appendChild(btnUpdate);
        // // contPost.appendChild(btnDelete);
        // posts.appendChild(contPost);

    }
})




