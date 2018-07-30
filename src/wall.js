const buttonLogout = document.querySelector(".buttonLogout");
const bd = document.getElementById('bd');
const btnSave = document.getElementById('btnSave');
const post = document.getElementById('post');
const posts = document.getElementById('posts');
const users = document.getElementById('postsuser');
const userspost = document.getElementById('myuserpost');
function escriborpostear() {
    const currentUser = firebase.auth().currentUser;
    const messageAreaText = post.value;
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var postData = {
        author: currentUser.displayName,
        uid: currentUser.uid,
        body: messageAreaText,

    };
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + currentUser.uid + '/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
}
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




            firebase.database().ref('/posts/')
                .on('child_added', (newPosts) => {

                    posts.innerHTML += `<p id="hola"> ${newPosts.val().author}</p>
                 <p class="post-area">${newPosts.val().body}</p>`;

                });
            firebase.database().ref('/user-posts/' + user.uid)
                .on('child_added', (newPosts) => {
                    userspost.innerHTML += `<p class="post-area" id="mypots">${newPosts.val().body}</p>
                    <br>
                    <button id="deletePots"> Eliminar </button> 
                     <button id="editPots">editar </button>
                     <button id="likePots">EcoLove</button>
                     `;
                    // //  const delet = document.getElementById('deletePots')
                    deletePots.addEventListener('click', () => {
                        firebase.database().ref().child('/user-posts/' + user.uid + '/' + newPosts.key).remove();
                        firebase.database().ref().child('/posts/' + newPosts.key).remove();
                        deletePots.remove()
                        editPots.remove()
                        mypots.remove()
                        likePots.remove()
                    
                        // hola.remove()
                    })
                    editPots.addEventListener('click', () => {
                        editPots.remove()
                        var contPost = document.createElement('div');
                        var textPost = document.createElement('textarea');
                         textPost.setAttribute('id', newPosts);

                        contPost.appendChild(textPost);

                        // document.getElementById("mypots").contentEditable = "true";
                        // var btnpublicar = document.createElement('input');
                        // btnpublicar.setAttribute('value', 'publicar');
                        // btnpublicar.setAttribute('type', 'button');
                        // btnpublicar.addEventListener('click', () => {
                        //     const newUpdate = document.getElementById("mypots");

                        //     const messageAreaText = newUpdate.value

                        //     const nuevoPost = {
                        //         body: messageAreaText,
                        //     };
                        //     var updateUser = {};
                        //     // var updatePost = {};        
                        //     updateUser['/user-posts/' + user.uid + '/' + newPosts.key] = nuevoPost;
                        //     // updatePost['/posts/' + newPosts.key] = nuevoPost;
                        //     firebase.database().ref().update(updateUser);
                        //     // firebase.database().ref().update(updatePost);
                        //     // updatePostUser(user.uid , newUpdate.value, newPosts.key);
                        // })
                        // mypots.appendChild(btnpublicar);
                    })

                });
            // const deletePots = document.getElementById('deletePots')


        }
        else {
            console.log('no esta logueado');
        }
        console.log("User > " + JSON.stringify(user));
    });
}



function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}


buttonLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        window.location = "home.html"
    })
        .catch(function (error) { });
})

btnSave.addEventListener('click', () => {
    const postMuro = post.value;
    const space = postMuro.trim()
    if (postMuro.length !== 0 && space !== '') {
        escriborpostear();
    }
})



