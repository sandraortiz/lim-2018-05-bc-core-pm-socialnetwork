const buttonLogout = document.querySelector(".buttonLogout");
const bd = document.getElementById('bd');
const btnSave = document.getElementById('btnSave');
const userspost = document.getElementById('myuserpost');
const posts = document.getElementById('posts');
const buttonperfil = document.getElementById('myperfil');
const myperfil = document.getElementById('myperfilinformation');
const buttonwall = document.getElementById('wall');
const post = document.getElementById('post');
const optionEstado = document.getElementById('myselect');

window.onload = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            userName.innerHTML = `${user.displayName}`;
            userImage.innerHTML = ` <img src="${user.photoURL}" alt="user" class="profile-photo" />`;
            if (userName.innerHTML == 'null') {
                userName.innerHTML = `${user.email}`
            }
            writeUserData(user.uid, user.displayName, user.email, user.photoURL);
            //  writeNewPost(user.uid ,user.displayName , user.photoURL , post.value);

            callFirebasePosts(user.uid)
        }
        else {
            console.log('no esta logueado');
        }
        console.log("User > " + JSON.stringify(user));
    });
}

const writeUserData = (userId, name, email, imageUrl) => {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

const writeNewPost = () => {
    const currentUser = firebase.auth().currentUser;
    const messageAreaText = post.value;
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var postData = {
        image: currentUser.photoURL,
        author: currentUser.displayName,
        uid: currentUser.uid,
        body: messageAreaText,
        key: newPostKey,
        likeCount: 0,
    };
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + currentUser.uid + '/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);

}

const privatePost = () => {
    const currentUser = firebase.auth().currentUser;
    const messageAreaText = post.value;
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var postData = {
        image: currentUser.photoURL,
        author: currentUser.displayName,
        uid: currentUser.uid,
        body: messageAreaText,
        key: newPostKey,
        likeCount: 0,
    };
    var updates = {};
    updates['/user-posts/' + currentUser.uid + '/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
}

const callFirebasePosts = (uid) => {
    const userPost = firebase.database().ref('user-posts').child(uid);
    userPost.on("child_added", newPostsUser => {
        escribirmyuser(newPostsUser);
    });
    const everybodyPost = firebase.database().ref('posts');
    everybodyPost.on("child_added", newPosts => {
        escribirDatatTodosLosposts(newPosts);

    });

}

const escribirDatatTodosLosposts = (newPosts) => {
    posts.innerHTML +=
        `<div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                        <img id='image' src="${newPosts.val().image}" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
                       <h4 id=${newPosts.val().key}>${newPosts.val().author}</h4><br>
                        <hr class="w3-clear">
                        <p id="mypots">${newPosts.val().body}</p>
                        <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> EcoLike</button> 
                      
                      </div>
                      `;

}
const escribirmyuser = (newPostsUser) => {
    userspost.innerHTML += `<div class="w3-container w3-card w3-white w3-round w3-margin" id="${newPostsUser.val().key}"><br>
<img id="${newPostsUser.val().key}" src="${newPostsUser.val().image}" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
<h4 id="${newPostsUser.val().key}">${newPostsUser.val().author}</h4><br>
<hr class="w3-clear">
<p id="${newPostsUser.val().key}">${newPostsUser.val().body}</p>
<button id="${newPostsUser.val().key}" type="button" class="w3-button w3-theme-d1 w3-margin-bottom buttondelets"><i class="fa fa-thumbs-up"></i> EcoLike</button> 
<button id="${newPostsUser.val().key}" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> Editar</button>
<button id="${newPostsUser.val().key}" type="button" class="w3button"><i class="fa fa-thumbs-up"></i> Eliminar</button> 
</div>`;

    const buttonvdelete = document.querySelector(".w3button");

    buttonvdelete.addEventListener('click', (evt) => {

        if  (newPostsUser.val().key = evt.target.id) {
             firebase.database().ref().child( `/user-posts/${newPostsUser.val().uid}/${newPostsUser.val().key }`).remove();
        firebase.database().ref().child( `/posts/${newPostsUser.val().key }`).remove();  
        }
        //       firebase.database().ref().child('/user-posts/' + user.uid + '/' + newPosts.key).remove();
        // firebase.database().ref().child('/posts/' + newPosts.key).remove();
     
        // mypostss.remove();
    })

//     const buttondelete = document.getElementById("deletePots");
//     buttondelete.addEventListener('click', () => {
//         firebase.database().ref().child('/user-posts/' + user.uid + '/' + newPosts.key).remove();
//         firebase.database().ref().child('/posts/' + newPosts.key).remove();
//         mypostss.remove();
// })
    // const post = document.getElementById('mypostss');
    // const buttonedit = document.getElementById("${newPosts.val().key}");
    // buttonedit.addEventListener('click', () => {

    //     buttonedit.style.display = 'none'
    //     document.getElementById("myposts").contentEditable = "true";
    //     var btnpublicar = document.createElement('button');
    //     btnpublicar.setAttribute('value', 'publicar');
    //     // btnpublicar.setAttribute('type', 'button');
    //     btnpublicar.setAttribute('class', "w3-button w3-theme-d1 w3-margin-bottom")
    //     btnpublicar.setAttribute('id', `${newPostsUser.val().key}`)
    //     btnpublicar.addEventListener('click', () => {


    //         console.log('hola');


    //         const newUpdate = document.getElementById('myposts');
    //         const messageAreaText = newUpdate.innerText
    //         const postData = {

    //             body: messageAreaText,

    //         };
    //         var updateUser = {};
    //         var updatePost = {};
    //         updateUser['/user-posts/' + user.uid + '/' + newPosts.key] = postData;
    //         updatePost['/posts/' + newPosts.key] = postData;
    //         firebase.database().ref().update(updateUser);
    //         firebase.database().ref().update(updatePost);
    //         btnpublicar.style.display = 'none'
    //         buttonedit.style.display = 'block'
    //         //updatePostUser(user.uid , newUpdate.value, newPosts.key);
    //     })
    //     post.appendChild(btnpublicar);
    // })
}

buttonperfil.addEventListener('click', () => {
    posts.style.display = 'none';
    userspost.style.display = 'block';
    myperfil.style.display = 'block';
})
buttonwall.addEventListener('click', () => {
    posts.style.display = 'block';
    userspost.style.display = 'none';
    myperfil.style.display = 'none';
})

buttonLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        window.location = "home.html"
    })
        .catch(function (error) { });
})

btnSave.addEventListener('click', () => {
    const postMuro = post.value;
    const space = postMuro.trim()
    const hola = optionEstado.value;
    if (postMuro.length !== 0 && space !== '') {
        if (hola == 'publico') {
            writeNewPost();
        }
        else if (hola == 'privado') {
            privatePost();
        }

        else {
            alert('por favor escoga una opcion')
        }
    }
})



