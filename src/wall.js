const buttonLogout = document.querySelector(".buttonLogout");
const userPostProfile = document.getElementById('userPostProfile');
const allPostsWall= document.getElementById('allPostsWall');
const buttonProfile = document.getElementById('Profile');
const buttonWall = document.getElementById('wall');
const profileInformation = document.getElementById('profileInformation');
const buttonPublishApost = document.getElementById('publishApost'); 
const postContent = document.getElementById('postContent');
const selectPublicPrivate = document.getElementById('selectPublicPrivate');
// const bd = document.getElementById('bd');
buttonProfile.addEventListener('click', () => {
    allPostsWall.style.display = 'none';
    userPostProfile.style.display = 'block';
    profileInformation.style.display = 'block';
})
buttonWall.addEventListener('click', () => {
    allPostsWall.style.display = 'block';
    userPostProfile.style.display = 'none';
    profileInformation.style.display = 'none';
})
buttonLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        window.location = "home.html"
    })
        .catch(function (error) { });
})
buttonPublishApost.addEventListener('click', () => {
    const postMuro = postContent.value;
    const space = postMuro.trim()
    const select = selectPublicPrivate.value;
    if (postMuro.length !== 0 && space !== '') {
        if (select== 'publico') {
            writeNewPostFirebase();
        }
        else if (select == 'privado') {
            writePrivateUserPosts ();
        }

        else {
            alert('por favor escoga una opcion')
        }
    }
})

window.onload = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            userName.innerHTML = `${user.displayName}`;
            userImage.innerHTML = ` <img src="${user.photoURL}" alt="user" class="profile-photo" />`;
            if (userName.innerHTML == 'null') {
                userName.innerHTML = `${user.email}`
            }
            writeUserDataFirebase(user.uid, user.displayName, user.email, user.photoURL);
            //  writeNewPost(user.uid ,user.displayName , user.photoURL , post.value);

            callFirebaseAllPosts(user.uid)
        }
        else {
            console.log('no esta logueado');
        }
        console.log("User > " + JSON.stringify(user));
    });
}

const writeNewPostFirebase = () => {
    const currentUser = firebase.auth().currentUser;
    const messageAreaText = postContent .value;
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
const writeUserDataFirebase = (userId, name, email, imageUrl) => {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}
const writePrivateUserPosts = () => {
    const currentUser = firebase.auth().currentUser;
    const messageAreaText = postContent.value;
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

const callFirebaseAllPosts = (uid) => {
    const userPost = firebase.database().ref('user-posts').child(uid);
    userPost.on("child_added", newPostsUser => {
        showPostsUserProfile(newPostsUser);
    });
    const everybodyPost = firebase.database().ref('posts');
    everybodyPost.on("child_added", newPosts => {
        showallPostsWall(newPosts);

    });

}

const showallPostsWall = (newPosts) => {
    allPostsWall.innerHTML +=
        `<div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                        <img id='image' src="${newPosts.val().image}" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
                       <h4 id=${newPosts.val().key}>${newPosts.val().author}</h4><br>
                        <hr class="w3-clear">
                         <p id="mypots">${newPosts.val().body}</p>
                        <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> EcoLike</button> 
                      
                      </div>
                      `;

}
const  showPostsUserProfile = (newPostsUser) => {
    const postskey = newPostsUser.key
    var contPost = document.createElement('div');
    contPost.setAttribute('class', "w3-container w3-card w3-white w3-round w3-margin")
    var image = document.createElement('img');
    image.setAttribute('src', `${newPostsUser.val().image}`)
    image.setAttribute('class', "w3-left w3-circle w3-margin-right")
    image.setAttribute('style', "width:60px")
    image.setAttribute('alt', "Avatar")
    const espacaio = document.createElement('hr');
    espacaio.setAttribute('class', "w3-clear")
    const author = document.createElement('h4');
    author.innerHTML = `${newPostsUser.val().author}`
    // author.setAttribute('class',  )

    var textPost = document.createElement('p');
    textPost.setAttribute('class', "w3-left w3-circle w3-margin-right");
    textPost.setAttribute('id', postskey);

    var btnEdit = document.createElement('input');
    btnEdit.setAttribute('value', 'Editar');
    btnEdit.setAttribute('type', 'button');
    btnEdit.setAttribute('id', postskey);
    btnEdit.setAttribute('class', "w3-button w3-theme-d1 w3-margin-bottom")

    var btnDelete = document.createElement('input');
    btnDelete.setAttribute('value', 'delete');
    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('id', postskey);
    btnDelete.setAttribute('class', "w3-button w3-theme-d1 w3-margin-bottom")

    var btnLike = document.createElement('input');
    btnLike.setAttribute('value', 'Like');
    btnLike.setAttribute('type', 'button');
    btnLike.setAttribute('id', 'likes');


    // debugger
    textPost.setAttribute('id', postskey);
    textPost.innerHTML = `${newPostsUser.val().body}`;
    btnDelete.addEventListener('click', (evt) => {
        if (newPostsUser.key === evt.target.id) {
            const question = confirm('Esta seguro que desea eliminar esta publicacion?')
            if (question === true) {
                firebase.database().ref().child(`/posts/${newPostsUser.key}`).remove();
                firebase.database().ref().child(`/user-posts/${newPostsUser.val().uid}/${newPostsUser.key}`).remove();
           contPost.remove();
                // textPost.remove();
                // btnEdit.remove();
                // btnDelete.remove();
                // btnLike.remove();
            }
        }

    })

    btnEdit.addEventListener('click', (evt) => {
        textPost.contentEditable = "true";
        btnEdit.style.display = 'none';
        var btnpublish = document.createElement('input');
        btnpublish.setAttribute('value', 'publicar');
        btnpublish.setAttribute('type', 'button');
        btnpublish.addEventListener('click', () => {
            if (newPostsUser.key  === evt.target.id) {

                const currentUser = firebase.auth().currentUser;
                const newUpdate = document.getElementById(postskey);

                const newPostvalue = newUpdate.innerText
                const nuevoPost = {
                    body: newPostvalue,
                    image: currentUser.photoURL,
                    author: currentUser.displayName,
                    uid: currentUser.uid,
                    key: postskey,
                    likeCount: 0,
                };
                var updatesUser = {};
                var updatesPost = {};
                updatesUser[`/user-posts/${newPostsUser.val().uid}/${newPostsUser.key}`] = nuevoPost;
                updatesPost[`/posts/${newPostsUser.key}`] = nuevoPost;
               firebase.database().ref().update(updatesUser);
                firebase.database().ref().update(updatesPost);
            }
            btnpublish.style.display = 'none';
            btnEdit.style.display = 'block';
        })
        contPost.appendChild(btnpublish);
  });

    userPostProfile.appendChild(contPost);
     contPost.appendChild(image);
    contPost.appendChild(author);
    contPost.appendChild(espacaio);
    contPost.appendChild(textPost);
    contPost.appendChild(espacaio);
    contPost.appendChild(btnEdit);
    contPost.appendChild(btnDelete);


}



