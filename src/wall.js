const buttonLogout = document.querySelector(".buttonLogout");
const userPostProfile = document.getElementById('userPostProfile');
const allPostsWall = document.getElementById('allPostsWall');
const buttonProfile = document.getElementById('Profile');
const buttonWall = document.getElementById('wall');
const profileInformation = document.getElementById('profileInformation');
const buttonPublishApost = document.getElementById('publishApost');
const postContent = document.getElementById('postContent');
const selectPublicPrivate = document.getElementById('selectPublicPrivate');
// const bd = document.getElementById('bd');

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
//testear
const writeUserDataFirebase = (userId, name, email, imageUrl) => {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

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
        if (select == 'publico') {
            writeNewPostFirebase();
        }
        else if (select == 'privado') {
            writePrivateUserPosts();
        }

        else {
            alert('por favor escoga una opcion')
        }
    }
})


//testear
const writeNewPostFirebase = () => {
    const currentUser = firebase.auth().currentUser;
    const messageAreaText = postContent.value;
    const newPostKey = firebase.database().ref().child('posts').push().key;
    const postData = {
        image: currentUser.photoURL,
        author: currentUser.displayName,
        uid: currentUser.uid,
        body: messageAreaText,
        key: newPostKey,
        likeCount: 0,
    };
    const updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + currentUser.uid + '/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);

}
//testear
const writePrivateUserPosts = () => {
    const currentUser = firebase.auth().currentUser;
    const messageAreaText = postContent.value;
    const newPostKey = firebase.database().ref().child('posts').push().key;
    const postData = {
        image: currentUser.photoURL,
        author: currentUser.displayName,
        uid: currentUser.uid,
        body: messageAreaText,
        key: newPostKey,
        likeCount: 0,
    };
    const updates = {};
    updates['/user-posts/' + currentUser.uid + '/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
}
//testear
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

    const postskey = newPosts.key
    const contPost = document.createElement('div');
    contPost.setAttribute('class', "w3-container w3-card w3-white w3-round w3-margin")

    const image = document.createElement('img');
    image.setAttribute('src', `${newPosts.val().image}`)
    image.setAttribute('class', "w3-left w3-circle w3-margin-right")
    image.setAttribute('style', "width:60px")
    image.setAttribute('alt', "Avatar")

    const espacaio = document.createElement('hr');
    espacaio.setAttribute('class', "w3-clear")

    const author = document.createElement('h4');
    author.innerHTML = `${newPosts.val().author}`
    // author.setAttribute('class',  )

    const textPost = document.createElement('p');
    textPost.setAttribute('class', "w3-left w3-circle w3-margin-right");
    textPost.setAttribute('id', postskey);
    textPost.innerHTML = `${newPosts.val().body}`;

/* <button id="${newPostsUser.val().key}" type="button" class="w3-button w3-theme-d1 w3-margin-bottom "><i class="fa fa-thumbs-up"></i> EcoLike</button>  */
    const btnLike = document.createElement('input');
    btnLike.setAttribute('value', 'Like');
    btnLike.setAttribute('type', 'button');
    btnLike.setAttribute('id', postskey);
    btnLike.setAttribute('class' , "w3-button w3-theme-d1 w3-margin-bottom ")
    const icolike = document.createElement('i')
    
    icolike.setAttribute('class', "fa fa-thumbs-up")
    btnLike.appendChild(icolike);

    allPostsWall.appendChild(contPost);
    contPost.appendChild(image);
    contPost.appendChild(author);
    contPost.appendChild(espacaio);
    contPost.appendChild(textPost);
    contPost.appendChild(espacaio);
    contPost.appendChild(btnLike);

}
const showPostsUserProfile = (newPostsUser) => {
    const postskey = newPostsUser.key

    const contPost = document.createElement('div');
    contPost.setAttribute('class', "w3-container w3-card w3-white w3-round w3-margin")

    const image = document.createElement('img');
    image.setAttribute('src', `${newPostsUser.val().image}`)
    image.setAttribute('class', "w3-left w3-circle w3-margin-right")
    image.setAttribute('style', "width:60px")
    image.setAttribute('alt', "Avatar")

    const espacaio = document.createElement('hr');
    espacaio.setAttribute('class', "w3-clear")

    const author = document.createElement('h4');
    author.innerHTML = `${newPostsUser.val().author}`
    // author.setAttribute('class',  )

    const textPost = document.createElement('p');
    textPost.setAttribute('class', "w3-left w3-circle w3-margin-right");
    textPost.setAttribute('id', postskey);
    textPost.innerHTML = `${newPostsUser.val().body}`;

    const btnEdit = document.createElement('input');
    btnEdit.setAttribute('value', 'Editar');
    btnEdit.setAttribute('type', 'button');
    btnEdit.setAttribute('id', postskey);
    btnEdit.setAttribute('class', "w3-button w3-theme-d1 w3-margin-bottom")

    const btnDelete = document.createElement('input');
    btnDelete.setAttribute('value', 'delete');
    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('id', postskey);
    btnDelete.setAttribute('class', "w3-button w3-theme-d1 w3-margin-bottom")

    const btnLike = document.createElement('input');
    btnLike.setAttribute('value', 'Like');
    btnLike.setAttribute('type', 'button');
    btnLike.setAttribute('id', 'likes');

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
        const btnpublish = document.createElement('input');
        btnpublish.setAttribute('value', 'publicar');
        btnpublish.setAttribute('type', 'button');
        btnpublish.setAttribute('id', postskey)
        btnpublish.addEventListener('click', (evt) => {
               if (postskey === evt.target.id) {
                const currentUser = firebase.auth().currentUser;
                const newUpdate = textPost.innerText
                const newPostvalue = newUpdate
                const nuevoPost = {
                    body: newPostvalue,
                    image: currentUser.photoURL,
                    author: currentUser.displayName,
                    uid: currentUser.uid,
                    key: postskey,
                    likeCount: 0,
                };
                const updatesUser = {};
                const updatesPost = {};
                updatesUser[`/user-posts/${newPostsUser.val().uid}/${newPostsUser.key}`] = nuevoPost;
                updatesPost[`/posts/${newPostsUser.key}`] = nuevoPost;
                firebase.database().ref().update(updatesUser);
                firebase.database().ref().update(updatesPost);
            }
            btnpublish.style.display = 'none';
            btnEdit.style.display = 'block';
            textPost.contentEditable = "false";
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



